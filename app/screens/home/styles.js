import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f2ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0077b6',
    marginBottom: 15,
    textAlign: 'center',
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  listContainer: {
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 30,
    marginTop: 10,
  },
  item: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 30,
    gap: 10,
  },
  button: {
    backgroundColor: '#0077b6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
    width:100,
    alignItems: 'center'
  },
  logoutButton: {
    backgroundColor: '#b60e0e',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  footer: {
    marginTop: 30,
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
  },
});
