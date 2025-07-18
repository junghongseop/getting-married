'use client';

import Toast from '@/components/common/Toast/Toast';
import AppLayout from '@/layouts/AppLayout';
import { useToast } from '@/utils/useToast';
import { getTemplateFontStyle } from '@merried/design-system';
import { Column, LoginButton } from '@merried/ui';
import { flex } from '@merried/utils';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const Login = () => {
  const { showToast, toastMessage, toastType, show } = useToast();
  const router = useRouter();
  const kakao = process.env.NEXT_PUBLIC_KAKAO_LOGIN_URL;
  const naver = process.env.NEXT_PUBLIC_NAVER_LOGIN_URL;

  const handleNaverLogin = () => {
    if (naver) {
      router.push(naver);
    } else {
      show('네이버 로그인 URL이 설정되어 있지 않습니다', 'ERROR');
    }
  };

  const handleKakaoLogin = () => {
    if (kakao) {
      router.push(kakao);
    } else {
      show('카카오 로그인 URL이 설정되어 있지 않습니다', 'ERROR');
    }
  };

  return (
    <AppLayout>
      <StyledLogin>
        <Text>우리 결혼할래요?</Text>
        <Column alignItems="center" width="100%" gap={12}>
          <LoginButton type="KAKAO" onClick={handleKakaoLogin} />
          <LoginButton type="NAVER" onClick={handleNaverLogin} />
        </Column>
      </StyledLogin>
      {showToast && <Toast type={toastType}>{toastMessage}</Toast>}
    </AppLayout>
  );
};

export default Login;

const StyledLogin = styled.div`
  ${flex({
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  })}
  width: 100%;
  height: 100vh;
  padding: 180px 12px 97px;
  background-image: url('/loginBackground.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Text = styled.div`
  ${getTemplateFontStyle('template2', 'KoreanCNMM')}
  color: #FF9D94;
`;
