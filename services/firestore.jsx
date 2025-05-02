import { collection, getDocs, query, where, doc, getDoc, addDoc } from 'firebase/firestore';
import banco from '../factory/firebase';
import { auth } from '../factory/firebase';

export const getAtividadesComReviews = async () => {
  try {
    // Busca todas as atividades
    const atividadesSnapshot = await getDocs(collection(banco, 'activities'));
    const atividades = atividadesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Busca todas as avaliações
    const reviewsSnapshot = await getDocs(collection(banco, 'reviews'));
    const reviews = reviewsSnapshot.docs.map(doc => doc.data());

    // Conta as avaliações de cada atividade
    const reviewsCount = reviews.reduce((acc, review) => {
      const activityId = review.activity?.id;
      if (activityId) {
        acc[activityId] = (acc[activityId] || 0) + 1;
      }
      return acc;
    }, {});

    // Junta o count de avaliações nas atividades
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

export const inscreverAtividade = async (atividadeId, selectedDate) => {
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
  if (!snapshot.empty) {
    alert('Você já está inscrito nesta atividade para essa data!');
    return;
  }

  await addDoc(collection(banco, 'inscriptions'), {
    userId,
    atividadeId,
    selectedDate,
    timestamp: new Date()
  });
};

export const cancelarInscricao = async (atividadeId, selectedDate) => {
  const userId = auth.currentUser?.uid;
  if (!userId) return;

  const q = query(
    collection(banco, 'inscriptions'),
    where('userId', '==', userId),
    where('atividadeId', '==', atividadeId),
    where('selectedDate', '==', selectedDate)
  );

  const snapshot = await getDocs(q);

    const deletions = snapshot.docs.map((docSnap) => {
      console.log("Removendo:", docSnap.id, docSnap.data());
      return deleteDoc(doc(banco, 'inscriptions', docSnap.id));
    });

    await Promise.all(deletions);
};

export const getInscricoesDoUsuario = async () => {
  const userId = auth.currentUser?.uid;
  if (!userId) return [];

  const q = query(collection(banco, 'inscriptions'), where('userId', '==', userId));
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

  return inscricoes;
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