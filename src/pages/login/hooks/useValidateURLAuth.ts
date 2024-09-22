import { isSignInWithEmailLink, signInWithEmailLink, updatePassword } from "firebase/auth";
import { firebaseAuth } from "@/firebase.ts";

export const useValidateURLAuth = () => {
  const { message } = App.useApp();

  // 来自验证链接的注册登录：设置密码并通过登录
  const URLObject: URL = new URL(location.href);
  const emailParam: string | null = URLObject.searchParams.get("eml");
  const passwordParam: string | null = URLObject.searchParams.get("pwd");
  const signIn = async () => {
    if (isSignInWithEmailLink(firebaseAuth, location.href) === false) return;
    if (emailParam && passwordParam) {
      try {
        await signInWithEmailLink(firebaseAuth, emailParam, location.href);
        await updatePassword(firebaseAuth.currentUser!, passwordParam);
        message.success("邮箱验证通过，注册成功");
      } catch (error) {
        message.error("验证链接失败");
        console.warn(error);
      }
    }
  };

  useEffect(() => {
    signIn();
  }, []);
};
