import { sendSignInLinkToEmail } from "firebase/auth";
import { firebaseAuth } from "@/firebase.ts";

interface RegisterFieldType {
  email: string;
  password: string;
}

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();
  const navigate = useNavigate();

  // 电子邮箱链接验证
  const [sendEmail, setSendEmail] = useState(false);
  const handleFinish = async (values: RegisterFieldType) => {
    const { email, password } = values;
    setLoading(true);
    const actionCodeSettings = {
      url: `${location.origin}?eml=${email}&pwd=${password}#/login`,
      handleCodeInApp: true,
    };
    try {
      await sendSignInLinkToEmail(firebaseAuth, email, actionCodeSettings);
      message.success({
        content: "验证链接已发送至邮箱，请验证后去登录",
        duration: 5,
      });
      setSendEmail(true);
    } catch (error) {
      message.error("邮箱验证链接发送失败，请稍后再试");
      console.warn("邮箱验证链接发送失败", error);
    }
    setLoading(false);
  };
  return (
    <>
      <Form name="register" className="w-400px" size="large" onFinish={handleFinish}>
        <Form.Item name="email" rules={[{ required: true, message: "" }]}>
          <Input placeholder="输入您的电子邮箱..." className="h-50px"></Input>
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: "" }]}>
          <Input type="password" placeholder="输入您的密码..." className="h-50px"></Input>
        </Form.Item>
        <Form.Item>
          {sendEmail ? (
            <Button type="primary" className="h-50px" block onClick={() => navigate("/login")}>
              已验证电子邮箱，去登录
            </Button>
          ) : (
            <Button type="primary" htmlType="submit" loading={loading} className="h-50px" block>
              注册
            </Button>
          )}
        </Form.Item>
      </Form>
      <div
        className="text-[#c0c0c0] text-center underline cursor-pointer"
        onClick={() => navigate("/login")}
      >
        返回登录
      </div>
    </>
  );
}
