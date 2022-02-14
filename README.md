## 🎃 Description

- passport를 활용한 OAuth 로그인 방식을 적용하던 도중, 구현 방법에 대해서 정리 해놓는게 좋을거같아서 본 repository를 생성
- client side는 3000port, server side는 4000port에서 실행

### 🎃 Front ( port : 3000 )

#### run...

```
$ yarn install
$ yarn start
```

### 🎃 Back ( port : 4000 )

- kakao 로그인 진행시, [Kakao Developer](https://developers.kakao.com/)사이트에서 본인의 앱 등록을 마친 뒤, 앱 키를 가져와 프로젝트에 셋팅해놓아야 passport의 Strategy가 정상적으로 작동
- mongoDB는 localhost:27017에 실행 후 사용
- 본 repository 실행시, `MONGO_URL, JWT_SECRET, CLIENT_ID, CLIENT_SECRET, CALLBACK_URL`은 back directory의 `.env`파일에서 관리

#### run...

```
$ yarn install
$ nodemon index.js
```

### 🎃 Issue

> 2022-02-11 프로젝트를 진행하던 도중, OAuth를 활용한 로그인 방식에 구현이 너무 오래걸려, 정리가 필요하던 차에 본 repo를 생성했다. kakao부터 진행중인데, client에서 카카오로부터 인가코드를 받아오고, 해당 인가코드와 callback url로 다시 accessToken, refreshToken, profile 정보 등을 가져오고, 카카오로부터 받은 accessToken으로 우리가 회원들에게 제공할 token을 만들었는데, 그 토큰이 cookie에 심어지지가 않는다.
>
> - 토큰을 다시 만든 이유 : 카카오로 부터 받은 유저정보를 가지고, 본 서비스에서 사용할 토큰을 다시만드는데 해당 토큰은 여러 api를 호출할때 정상적인 로그인 유저가 요청한 것인지를 판단하는 미들웨어에서 사용됨

> 2022-02-14 토큰이 심어지지 않는 이유는 axios호출 중 config설정을 잘못한 것이 이유였다. 아래와 같이 axios호출할 경우에는 config 옵션을 이미 작성해둔 url과 method가 포함된 중괄호 안에 같이 작성해줘야 했던 것. ( axios호출에 대한 지식이 부족했기 때문에 일어났던 문제 였다. )
>
> 일단 토큰을 받아오는 부분까진 했는데, 로그아웃 하는 부분에서 또 막혔다. 카카오 OAuth 로그인 진행하는 부분에서 시간을 너무 많이 잡아 먹는 것 같아 걱정...
>
> ```
> // 수정 전...
> axios(
>     {
>       url: url,
>       method: "post",
>     },
>     {
>       withCredentials: true,
>     }
>   )
>     .then((res) => {
>       console.log("🔸 [client] res.data (OAuthCallbackKakao.js) =>", res.data);
>
>       localStorage.setItem("nickname", res.data.userNickname);
>
>       navigate("/");
>     })
>     .catch((err) => {
>       console.log("===> ", err);
>     });
>
> // 수정 후...
>   axios({
>     url: url,
>     method: "post",
>     withCredentials: true,
>   })
>     .then((res) => {
>       console.log("🔸 [client] res.data (OAuthCallbackKakao.js) =>", res.data);
>
>       localStorage.setItem("nickname", res.data.userNickname);
>
>       navigate("/");
>     })
>     .catch((err) => {
>       console.log("===> ", err);
>     });
> ```
