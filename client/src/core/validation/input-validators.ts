interface ObjToValidate {
    [fieldName: string]: any;
}
  
interface ValidatesFieldInObj {
    (obj: ObjToValidate): boolean;
}
  
interface Rule {
    test: ValidatesFieldInObj;
}
  
export interface NamedValidationResults {
    [name: string]: boolean;
}
  
export const validateNamedRules = (
    obj: any,
    rules: { [name: string]: Rule }
  ): NamedValidationResults => {
    return Object.keys(rules).reduce<NamedValidationResults>((res, name) => {
      const rule = rules[name];
      res[name] = rule.test(obj);
      return res;
    }, {});
};
  
export const validationMessages = {
    email: "Invalid email",
    password: "Password required",
    confirmedPassword: "Confirmed password does not match with password",
};
  
export const validationRules = {
    email: { test: (creds: any) => /\S+@\S+\.\S+/.test(String(creds.email)) },
    password: { test: (creds: any) => creds.password.length > 0 },
    confirmedPassword: {
        test: (creds: any) => creds.confirmedPassword === creds.password,
    },
};
  