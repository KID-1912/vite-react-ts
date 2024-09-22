import { signInWithEmailAndPassword, isSignInWithEmailLink } from "firebase/auth";
import { firebaseAuth } from "@/firebase.ts";

interface LoginFieldType {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();
  const navigate = useNavigate();
  const isAccessWithEmailLink = isSignInWithEmailLink(firebaseAuth, location.href);
  const initialLoginValues: LoginFieldType = {
    email: isAccessWithEmailLink ? "" : "example@example.com",
    password: isAccessWithEmailLink ? "" : "testtest",
  };

  const handleFinish = async (values: LoginFieldType) => {
    const { email, password } = values;
    setLoading(true);
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      navigate("/", { replace: true });
      message.success("登录成功");
    } catch (error) {
      message.error("登录失败");
      console.warn("登录失败", error);
    }
    setLoading(false);
  };
  return (
    <>
      <Form
        name="login"
        className="w-400px"
        size="large"
        initialValues={initialLoginValues}
        onFinish={handleFinish}
      >
        <Form.Item name="email" rules={[{ required: true, message: "" }]}>
          <Input placeholder="输入您的电子邮箱..." className="h-50px"></Input>
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: "" }]}>
          <Input type="password" placeholder="输入您的密码..." className="h-50px"></Input>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} className="h-50px" block>
            登录
          </Button>
        </Form.Item>
      </Form>
      <div
        className="text-[#c0c0c0] text-center underline cursor-pointer"
        onClick={() => navigate("/register")}
      >
        我有邮箱，去注册
      </div>
    </>
  );
}
