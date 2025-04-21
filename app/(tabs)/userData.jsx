import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackButton from '../../components/backButton'
import { getDadosUsuario } from '../../services/firestore'
import { signOut } from 'firebase/auth'
import { auth } from '../../factory/firebase'
import { useNavigation } from '@react-navigation/native'
import UserAvatar from '../../components/userAvatar'
import { Ionicons, MaterialIcons } from 'react-native-vector-icons'

const UserData = () => {
  const [usuario, setUsuario] = useState(null)
  const navigation = useNavigation()

  useEffect(() => {
    const carregarDados = async () => {
      const dados = await getDadosUsuario()
      setUsuario(dados)
    }

    carregarDados()
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    navigation.replace('login')
  }

  return (
    <View style={styles.wrapper}>
      <BackButton title="Dados pessoais" />
      <View style={styles.container}>
        {usuario && (
          <View style={styles.avatarContainer}>
            <UserAvatar
              name={usuario.name}
              avatarStyle={styles.largeAvatar}
              letterStyle={styles.largeLetter}
            />
            <Text style={styles.username}>{usuario.name}</Text>
          </View>
        )}

        <View style={styles.card}>
          <View style={styles.row}>
            <MaterialIcons name="email" size={20} color="#888" style={styles.icon} />
            <View>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{usuario?.email || '-'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons name="call-outline" size={20} color="#888" style={styles.icon} />
            <View>
              <Text style={styles.label}>Telefone</Text>
              <Text style={styles.value}>{usuario?.phone}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default UserData

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
    justifyContent: 'flex-start',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  largeAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  largeLetter: {
    fontSize: 40,
    fontWeight: '700',
  },
  username: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
    fontWeight: '600',
  },
  value: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  icon: {
    marginTop: 4,
  },
  logoutButton: {
    marginTop: 'auto',
    backgroundColor: '#fff5f5',
    borderWidth: 1,
    borderColor: '#e63946',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#e63946',
    fontSize: 16,
    fontWeight: '600',
  },
})
