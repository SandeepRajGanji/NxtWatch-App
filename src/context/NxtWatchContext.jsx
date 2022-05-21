import React from 'react'

const NxtWatchContext = React.createContext({
  activeTab: 'Home',
  isDarkTheme: false,
  savedVideos: [],
  changeActiveTabId: () => {},
  toggleTheme: () => {},
  addVideo: () => {},
})

export default NxtWatchContext
