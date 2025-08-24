import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6fafd',
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',

  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0077b6',
    marginTop: 100,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d0d7de',
    fontSize: 16,
    elevation: 2, 
    shadowColor: '#000', 
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  button: {
    backgroundColor: '#0077b6',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  graphPlaceholder: {
    width: '100%',
    height: 220,
    marginTop: 30,
    borderWidth: 2,
    borderColor: '#a5c9ea',
    borderStyle: 'dashed',
    borderRadius: 16,
    backgroundColor: '#e8f4fb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphText: {
    color: '#5b768d',
    fontSize: 16,
    fontStyle: 'italic',
  },
  footer: {
    marginTop: 30,
    fontSize: 15,
    color: '#444',
    textAlign: 'center',
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    padding: 10,
  },

  homeText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#0077b6',
    fontWeight: 'bold',
  },

});
