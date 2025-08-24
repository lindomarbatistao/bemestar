import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbf6f3ff',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0b72b9',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 12,
  },

  inputName: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginVertical: 6,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dbe3ee',
    fontSize: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },

  sectionLabel: {
    marginTop: 12,
    marginBottom: 6,
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },

 
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems:'center',
    justifyContent:'center'
  },

  dayBox: {
    width: '10%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0b72b9',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  dayBoxSelected: {
    backgroundColor: '#0b72b9',
  },
  dayText: {
    color: '#0b72b9',
    fontWeight: '700',
    fontSize: 12,
  },
  dayTextSelected: {
    color: '#0dc726ff',
  },

  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  inputTime: {
    width: '30%',           
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 4,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dbe3ee',
    fontSize: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },

  buttonPrimary: {
    backgroundColor: '#0b72b9',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
    elevation: 3,
  },
  buttonPrimaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  buttonSecondary: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dbe3ee',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSecondaryText: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '700',
  },
  
  helperText: {
    marginTop: 8,
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
  },
  
  listHeader: {
    marginTop: 16,
    marginBottom: 6,
  },
  listTitle: {
    fontSize: 16,
    color: '#0b72b9',
    fontWeight: '800',
  },
  emptyBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#eee2dbff',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    backgroundColor: '#fff8f9ff',
    marginTop: 6,
  },
  emptyText: {
    color: '#64748b',
  },
  
  card: {
    borderWidth: 1,
    borderColor: '#dbe3ee',
    borderRadius: 14,
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  cardHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardTitle: {
    fontWeight: '800',
    color: '#0f172a',
    fontSize: 16,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconAction: {
    width: 34,
    height: 34,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dbe3ee',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  danger: {
    borderColor: '#fecdd3',
    backgroundColor: '#fff5f5',
  },

  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#dbe3ee',
    backgroundColor: '#f8fafc',
  },
  chipOn: {
    backgroundColor: '#e6f9ef',
    borderColor: '#b6e7c9',
  },
  chipOff: {
    backgroundColor: '#fff7ed',
    borderColor: '#fed7aa',
  },
  chipTime: {
    backgroundColor: '#eef6ff',
    borderColor: '#c7ddff',
  },
  chipText: { fontSize: 12, fontWeight: '700' },
  chipTextOn: { color: '#166534' },
  chipTextOff: { color: '#9a3412' },
  chipTextTime: { color: '#1e3a8a' },

  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 8,
    marginBottom: 24,
  },
  homeText: {
    marginLeft: 8,
    fontSize: 15,
    color: '#0b72b9',
    fontWeight: '800',
  },
});
