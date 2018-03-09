export const GLOBAL_NAV_ON_MODULE_CHANGE = 'GLOBAL_NAV_ON_MODULE_CHANGE'

const initialState = {
  activeModuleId: ''
}

export default (state = initialState, action) => {

  switch (action.type) {
  
    case GLOBAL_NAV_ON_MODULE_CHANGE:

      return state

    default: return state
  }
}

export const changeModule = (activeModuleId, link) => ({
  type: GLOBAL_NAV_ON_MODULE_CHANGE,
    payload: { 
    activeModuleId
  }
})