import { collection, getDocs, query, where, doc, getDoc, addDoc, updateDoc, arrayUnion, deleteDoc } from 'firebase/firestore';
import banco from '../factory/firebase';
import { auth } from '../factory/firebase';

export const registrarAvaliacao = async (atividadeId, stars, description, selectedDate) => {
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error('Usuário não autenticado');

  const atividadeRef = doc(banco, 'activities', atividadeId);
  const userRef = doc(banco, 'users', userId);

  await addDoc(collection(banco, 'reviews'), {
    activity: atividadeRef,
    participant: userRef,
    stars,
    description,
  });

  const q = query(
    collection(banco, 'inscriptions'),
    where('userId', '==', userId),
    where('atividadeId', '==', atividadeId),
    where('selectedDate', '==', selectedDate)
  );

  const snapshot = await getDocs(q);
  const inscricaoDoc = snapshot.docs[0];

  if (inscricaoDoc) {
    const inscricaoRef = doc(banco, 'inscriptions', inscricaoDoc.id);
    await updateDoc(inscricaoRef, {
      review: false,
    });
  } else {
    throw new Error('Inscrição não encontrada');
  }
};

export const getInscricoesDoUsuario = async () => {
  const userId = auth.currentUser?.uid;
  console.log(userId)
  if (!userId) return [];

  const q = query(
    collection(banco, 'inscriptions'),
    where('userId', '==', userId),
    where('review', '==', true)
  );

  const snapshot = await getDocs(q);

  const inscricoes = await Promise.all(
    snapshot.docs.map(async (docSnap) => {
      const data = docSnap.data();
      const atividadeRef = doc(banco, 'activities', data.atividadeId);
      const atividadeDoc = await getDoc(atividadeRef);

      return {
        id: docSnap.id,
        ...data,
        atividade: atividadeDoc.exists() ? { id: atividadeDoc.id, ...atividadeDoc.data() } : null,
      };
    })
  );
  console.log(inscricoes)
  return inscricoes;
};

export const inscreverAtividade = async (atividadeId, selectedDate) => {
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("Usuário não autenticado.");

  const q = query(
    collection(banco, 'inscriptions'),
    where('userId', '==', userId),
    where('atividadeId', '==', atividadeId),
    where('selectedDate', '==', selectedDate)
  );

  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    console.log('Inscrição duplicada')
    throw new Error("Usuário já inscrito nesta atividade para esta data.");
  }

  await addDoc(collection(banco, 'inscriptions'), {
    userId,
    atividadeId,
    selectedDate,
    timestamp: new Date(),
    review: true
  });
};

export const adicionarDatasAtividade = async (atividadeId, novasDatas) => {
  try {
    const atividadeRef = doc(banco, 'activities', atividadeId);
    await updateDoc(atividadeRef, {
      dates: arrayUnion(...novasDatas)
    });
  } catch (error) {
    console.error("Erro ao adicionar datas:", error);
    throw error;
  }
};

export const buscarDatasAtividade = async (atividadeId) => {
  try {
    const docRef = doc(banco, 'activities', atividadeId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const todasDatas = docSnap.data().dates || [];
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);

      const datasFuturas = todasDatas.filter((dataStr) => {
        const data = new Date(dataStr);
        return data >= hoje;
      });

      return datasFuturas;
    }

    return [];
  } catch (error) {
    console.error("Erro ao buscar datas:", error);
    throw error;
  }
};

export const buscarAtividadesPorOrganizador = async (organizerId) => {
  if (!organizerId) throw new Error('organizerId está undefined');

  const atividadesRef = collection(banco, 'activities');
  const q = query(atividadesRef, where('organizer', '==', organizerId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const buscarInscritos = async (atividadeId) => {
  const inscritosRef = collection(banco, 'inscriptions');
  const q = query(inscritosRef, where('atividadeId', '==', atividadeId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getUsersByIds = async (userIds) => {
  const usuariosPromises = userIds.map(async (userId) => {
    const userDoc = await getDoc(doc(banco, 'users', userId));
    return userDoc.exists() ? userDoc.data() : null;
  });
  return (await Promise.all(usuariosPromises)).filter(Boolean);
};

export const buscarUsuariosAgrupadosPorData = async (atividadeId) => {
  const inscricoes = await buscarInscritos(atividadeId);

  const hoje = new Date();
  const hojeISO = hoje.toISOString().split('T')[0];

  const usuariosComData = await Promise.all(inscricoes.map(async (inscricao) => {
    if (!inscricao.userId || !inscricao.selectedDate) return null;

    if (inscricao.selectedDate < hojeISO) return null;

    const userDoc = await getDoc(doc(banco, 'users', inscricao.userId));
    if (!userDoc.exists()) return null;

    return {
      ...userDoc.data(),
      selectedDate: inscricao.selectedDate,
    };
  }));

  const agrupados = {};

  usuariosComData
    .filter(Boolean)
    .forEach((user) => {
      if (!agrupados[user.selectedDate]) {
        agrupados[user.selectedDate] = [];
      }
      agrupados[user.selectedDate].push(user);
    });

  return agrupados;
};

export const buscarUsuariosInscritosNaAtividade = async (atividadeId) => {
  const inscritos = await buscarInscritos(atividadeId);
  const userIds = [...new Set(inscritos.map((r) => r.userId).filter(Boolean))];
  const usuarios = await getUsersByIds(userIds);
  return usuarios;
};

export const getAtividadesComReviews = async () => {
  try {
    const atividadesSnapshot = await getDocs(collection(banco, 'activities'));
    const hoje = new Date().toISOString().split('T')[0];

    const atividades = atividadesSnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      .map(atividade => {
        const datasFuturas = (atividade.dates || []).filter(data => data >= hoje);
        return {
          ...atividade,
          dates: datasFuturas,
        };
      })
      .filter(atividade => atividade.dates.length > 0);

    const reviewsSnapshot = await getDocs(collection(banco, 'reviews'));
    const reviews = reviewsSnapshot.docs.map(doc => doc.data());

    const reviewsCount = reviews.reduce((acc, review) => {
      const activityId = review.activity?.id;
      if (activityId) {
        acc[activityId] = (acc[activityId] || 0) + 1;
      }
      return acc;
    }, {});

    const atividadesComReviews = atividades.map(atividade => ({
      ...atividade,
      reviewsCount: reviewsCount[atividade.id] || 0,
    }));

    return atividadesComReviews;
  } catch (error) {
    console.error('Erro ao buscar dados do Firebase:', error);
    throw error;
  }
};

export const getReviewsCountByActivity = async (activityId) => {
  try {
    const reviewsRef = collection(banco, 'reviews');
    const activityRef = doc(banco, 'activities', activityId);
    const q = query(reviewsRef, where('activity', '==', activityRef));
    const snapshot = await getDocs(q);
    return snapshot.size;
  } catch (error) {
    console.error('Erro ao contar avaliações:', error);
    throw error;
  }
};

export const getReviewsByActivity = async (activityId) => {
  try {
    const reviewsRef = collection(banco, 'reviews');
    const activityRef = doc(banco, 'activities', activityId);
    const q = query(reviewsRef, where('activity', '==', activityRef));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Erro ao buscar avaliações:', error);
    throw error;
  }
};

export const getUsersByRefs = async (userRefs) => {
  try {
    const userDocs = await Promise.all(userRefs.map(ref => getDoc(ref)));
    return userDocs
      .filter((doc) => doc.exists())
      .map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
};

export const cancelarInscricao = async (atividadeId, selectedDate) => {
  const userId = auth.currentUser?.uid;
  console.log(userId)
  if (!userId) return;

  const q = query(
    collection(banco, 'inscriptions'),
    where('userId', '==', userId),
    where('atividadeId', '==', atividadeId),
    where('selectedDate', '==', selectedDate)
  );

  const snapshot = await getDocs(q);

  const deletions = snapshot.docs.map((docSnap) => {
    return deleteDoc(doc(banco, 'inscriptions', docSnap.id));
  });

  await Promise.all(deletions);
};

export const getDadosUsuario = async () => {
  const userId = auth.currentUser?.uid;
  if (!userId) return null;

  const userRef = doc(banco, 'users', userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return { id: userSnap.id, ...userSnap.data() };
  } else {
    console.log('Usuário não encontrado no Firestore');
    return null;
  }
};

export const criarAtividade = async (dados) => {
  try {
    const docRef = await addDoc(collection(banco, 'activities'), dados);
    return docRef;
  } catch (error) {
    console.error('Erro ao criar atividade:', error);
    throw error;
  }
};