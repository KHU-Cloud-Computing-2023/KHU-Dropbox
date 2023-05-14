import { useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../App.css';

function SignUp(){
  const formSchema = yup.object({
    id: yup
    .string()
    .required('영문, 숫자포함 4자리를 입력해주세요.')
    .min(6, '최소 4자 이상 가능합니다')
    .max(12, '최대 12자 까지만 가능합니다')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,12}$/,
      '영문 숫자포함 4자리를 입력해주세요.'
    ),
    password: yup
    .string()
    .required('영문, 숫자포함 8자리를 입력해주세요.')
    .min(8, '최소 8자 이상 가능합니다')
    .max(15, '최대 15자 까지만 가능합니다')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/,
      '영문 숫자포함 8자리를 입력해주세요.'
    ),
    passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], '비밀번호가 다릅니다.'),
    name : yup
    .string()
    .required('이름을 입력해주세요.')
    .min(1, '이름을 입력해주세요')
    .max(20, '이름이 잘못 되었습니다.'),
    work : yup
    .string()
    .required('직업을 입력해주세요.'),
    education : yup
    .string()
    .required('학교를 입력해주세요.'),
    email : yup
    .string()
    .required('이메일을 입력해주세요.')
    .email('이메일 형식이 아닙니다.'),
    mobile : yup
    .string()
    .required('핸드폰 번호를 입력해주세요.'),
    // .mobile('형식이 다릅니다.')
  })
  
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    fetch('/api/signup', { //api end-point, 서버구현 후 수정
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="App">
      <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="title">
        KHUBox
      </div>
        <input
        type="text"
        name="id"
        class="form"
        placeholder="ID" {...register('id')}
        />
        {errors.id && <p>{errors.id.message}</p>}
        <input
          type="password"
          name="password"
          class="form"
          placeholder="Password" {...register('password')}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <input
          type="password"
          name="passwordConfirm"
          class="form"
          placeholder="비밀번호 확인" {...register('passwordConfirm')}
        />
        {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
        <input
          type="text"
          name="name"
          class="form"
          placeholder="Name" {...register('name')}
        />
        <input
          type="text"
          name="work"
          class="form"
          placeholder="Work" {...register('work')}
        />
        <input
          type="text"
          name="education"
          class="form"
          placeholder="Education" {...register('education')}
        />
        <input
        type="email"
        name="email"
        class="form"
        placeholder="Email" {...register('email')}
        />
        <input
          type="text"
          name="mobile"
          class="form"
          placeholder="Mobile" {...register('mobile')}
        />
        <button
          type="submit"
          disabled={Object.keys(errors).length > 0 || !watch()}
          onClick={handleSubmit(onSubmit)}
          class="signup"
          >Submit</button>
      </form>
    </div>
  );
}

export default SignUp;