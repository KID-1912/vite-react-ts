import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "@/firebase.ts";

interface LoginFieldType {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const initialLoginValues: LoginFieldType = {
    email: "example@example.com",
    password: "testtest",
  };

  const handleFinish = async (values: LoginFieldType) => {
    const { email, password } = values;
    setLoading(true);
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      navigate("/");
      messageApi.error("登录成功");
    } catch (error) {
      messageApi.error("登录失败");
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
        <Form.Item name="email">
          <Input value="你好" placeholder="输入您的电子邮箱..." className="h-50px"></Input>
        </Form.Item>
        <Form.Item name="password">
          <Input type="password" placeholder="输入您的密码..." className="h-50px"></Input>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} className="h-50px" block>
            登录
          </Button>
        </Form.Item>
      </Form>
      {contextHolder}
    </>
  );
}
