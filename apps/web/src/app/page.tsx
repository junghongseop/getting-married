'use client';

import Footer from '@/components/template/Footer';
import TemplateGrid from '@/components/template/TemplateGrid';
import AppLayout from '@/layouts/AppLayout';
import { useResetFormStores } from '@/store/form/recoilReset';
import { color } from '@merried/design-system';
import { Column, Text } from '@merried/ui';
import { flex } from '@merried/utils';
import { useEffect } from 'react';
import { styled } from 'styled-components';

const Template = () => {
  const { resetAllFormState } = useResetFormStores();

  useEffect(() => {
    resetAllFormState();
  }, []);

  return (
    <AppLayout>
      <StyledTemplate>
        <Column gap={8}>
          <Text fontType="H1" color={color.G900}>
            청접장 선택하기
          </Text>
          <Text fontType="P2" color={color.G80}>
            다양한 디자인의 청첩장 중 마음에 드는 디자인을 골라보세요
          </Text>
        </Column>
        <TemplateGrid />
      </StyledTemplate>
      <Footer />
    </AppLayout>
  );
};

export default Template;

const StyledTemplate = styled.div`
  position: relative;
  ${flex({ flexDirection: 'column' })}
  gap: 74px;
  width: 100%;
  min-height: 100vh;
  padding: 160px 120px 0px 120px;

  @media (max-width: 1024px) {
    padding: 140px 80px 0px 80px;
    gap: 50px;
  }

  @media (max-width: 768px) {
    padding: 120px 40px 0px 40px;
    gap: 40px;
  }

  @media (max-width: 480px) {
    padding: 100px 20px 0px 20px;
    gap: 30px;
  }
`;
