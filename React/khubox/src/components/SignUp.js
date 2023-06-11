import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import "../css/SignUp.css";


function SignUp() {
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
    name: yup
      .string()
      .required('이름을 입력해주세요.')
      .min(1, '이름을 입력해주세요')
      .max(20, '이름이 잘못 되었습니다.'),
    work: yup
      .string()
      .required('직업을 입력해주세요.'),
    education: yup
      .string()
      .required('학교를 입력해주세요.'),
    email: yup
      .string()
      .required('이메일을 입력해주세요.')
      .email('올바른 형식으로 다시 입력해주세요.'),
    // .matches(
    //   /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
    //   '올바른 형식으로 다시 입력해주세요.'
    // ),
    // mobile : yup
    //     .string()
    //     .required('010-xxxx-xxxx 형식으로 번호를 입력해주세요.')
    //     .matches(
    //         /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/,
    //         '올바른 형식으로 다시 입력해주세요.'
    //     ),
    // // .mobile('형식이 다릅니다.')
  })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data) => {
    const requestData = {
      loginId: data.id,
      name: data.name,
      password: data.password,
      email: data.email,
      work: data.work,
      education: data.education
    };
    console.log(requestData);
    fetch('/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // 추후 api통신을 통해 아이디 중복 검사 로직 추가 예정
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }


  // const onSubmit = (data) => {
  //   console.log(data);
  //   fetch('/auth/signup', { //api end-point, 서버구현 후 수정
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  //   })
  //       .then(response => response.json())
  //       .then(data => {
  //         console.log('Success:', data);
  //         // 추후 api통신을 통해 아이디 중복 검사 로직 추가 예정
  //       })
  //       .catch((error) => {
  //         console.error('Error:', error);
  //       });
  // };

  return (

    <div className="signup">
      <div className="title">
        KHUBox
      </div>
      <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="loginId"
          class="id"
          placeholder="ID" {...register('id')}
        />
        {errors.id && <p class="error">{errors.id.message}</p>}
        <input
          type="password"
          name="password"
          class="password"
          placeholder="Password" {...register('password')}
        />
        {errors.password && <p class="error">{errors.password.message}</p>}
        <input
          type="password"
          name="passwordConfirm"
          class="passwordConfirm"
          placeholder="비밀번호 확인" {...register('passwordConfirm')}
        />
        {errors.passwordConfirm && <p class="error">{errors.passwordConfirm.message}</p>}
        <input
          type="text"
          name="name"
          class="name"
          placeholder="Name" {...register('name')}
        />
        {errors.name && <p class="error">{errors.name.message}</p>}
        <input
          type="text"
          name="work"
          class="work"
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
          class="email"
          placeholder="Email" {...register('email')}
        />
        {errors.email && <p class="error">{errors.email.message}</p>}
        {/* <input
              type="text"
              name="mobile"
              class="mobile"
              placeholder="Mobile" {...register('mobile')}
          />
          {errors.mobile && <p class="error">{errors.mobile.message}</p>} */}

        <button
          type="submit"
          disabled={Object.keys(errors).length > 0 || !watch()}
          onClick={handleSubmit(onSubmit)}
          class="signupClick"
        >Sign up</button>
      </form>
    </div>
  );
}

export default SignUp;