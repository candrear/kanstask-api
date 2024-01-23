export const alertOverrideConflict = (
    originalObject: any,
    overridingObject: any,
    alertFn: (message: any) => void,
  ) => {
    Object.entries(overridingObject).forEach(
      ([overridingKey, overridingValue]: [unknown, unknown]) => {
        const originalValue = originalObject[overridingKey as keyof typeof originalObject];
  
        if (originalValue && overridingValue !== originalValue) {
          alertFn(`overriding object has key "${overridingKey}" with value "${overridingValue}" which will override original object value "${originalValue}"`);
        }
      },
    );
  };