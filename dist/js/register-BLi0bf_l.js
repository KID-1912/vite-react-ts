import{r as n,A as y,u as N,j as e,B as l,c as _,f as w}from"./index-g3bv0qI7.js";import{F as s,I as c}from"./index-CEuo6pbn.js";import{T as v}from"./index-B-_eiK6q.js";function I(){const[o,t]=n.useState(!1),{message:a}=y.useApp(),m=N(),p={email:"2754372364@qq.com",password:"testtest"},[d,u]=n.useState(!1),g=async x=>{const{email:i,password:h}=x;t(!0);const j={url:"".concat(location.origin,"?eml=").concat(i,"&pwd=").concat(h,"#/login"),handleCodeInApp:!0};try{await _(w,i,j),a.success({content:"验证链接已发送至邮箱，请验证后去登录",duration:5}),u(!0)}catch(f){a.error("邮箱验证链接发送失败，请稍后再试"),console.warn("邮箱验证链接发送失败",f)}t(!1)};return e.jsx(e.Fragment,{children:e.jsxs(s,{name:"register",className:"w-400px",size:"large",initialValues:p,onFinish:g,children:[e.jsx(s.Item,{name:"email",rules:[{required:!0,message:""}],children:e.jsx(c,{placeholder:"输入您的电子邮箱...",className:"h-50px"})}),e.jsx(s.Item,{name:"password",rules:[{required:!0,message:""}],children:e.jsx(c,{type:"password",placeholder:"输入您的密码...",className:"h-50px"})}),e.jsx(s.Item,{children:d?e.jsx(l,{type:"primary",className:"h-50px",block:!0,onClick:()=>m("/login"),children:"已验证电子邮箱，去登录"}):e.jsx(l,{type:"primary",htmlType:"submit",loading:o,className:"h-50px",block:!0,children:"注册"})})]})})}const r={"register-page":"_register-page_xe6m0_1","register-title":"_register-title_xe6m0_7","register-picture":"_register-picture_xe6m0_10"};function S(){return e.jsx("div",{className:r["register-page"],children:e.jsxs("div",{className:"flex items-center self-center",children:[e.jsxs("div",{className:"mr-80px",children:[e.jsx(v.Title,{level:2,className:r["register-title"],children:"注册"}),e.jsx(I,{})]}),e.jsx("div",{className:r["register-picture"]})]})})}export{S as default};