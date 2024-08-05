import ActionEnum from "../enums/action.enums";

type ActionHandler = {
  processAction: () => any;
};

const actionHandlers: Record<any, ActionHandler> = {
  [ActionEnum.ACTIVE]: {
    processAction: () => ({
      activeFlag: true,
      modifiedDate: new Date(),
    }),
  },
  [ActionEnum.INACTIVE]: {
    processAction: () => ({
      activeFlag: false,
      modifiedDate: new Date(),
    }),
  },
  [ActionEnum.DELETE]: {
    processAction: () => ({
      deleteFlag: true,
      modifiedDate: new Date(),
    }),
  },
  [ActionEnum.ON]: {
    processAction: () => ({
      pickerStatus: "On",
      modifiedDate: new Date(),
    }),
  },

  [ActionEnum.OFF]: {
    processAction: () => ({
      pickerStatus: "Off",
      modifiedDate: new Date(),
    }),
  },
};

export const getActionByType = (action: string): Object => {
  const handler = actionHandlers[action];
  return handler.processAction();
};
