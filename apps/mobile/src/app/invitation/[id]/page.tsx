'use client';

import Toast from '@/components/common/Toast/Toast';
import Account from '@/components/invitation/Account/Account';
import AttendFloatButton from '@/components/invitation/AttendFloatButton/AttendFloatButton';
import CoupleInfo from '@/components/invitation/CoupleInfo/CoupleInfo';
import Direction from '@/components/invitation/Direction/Direction';
import Greeting from '@/components/invitation/Greeting/Greeting';
import GuestBook from '@/components/invitation/GuestBook/GuestBook';
import GuestSnapShot from '@/components/invitation/GuestSnapShot/GuestSnapShot';
import Guide from '@/components/invitation/Guide/Guide';
import ShareURL from '@/components/invitation/ShareURL/ShareURL';
import StartBackground from '@/components/invitation/StartBackground/StartBackground';
import WeddingAlbum from '@/components/invitation/WeddingAlbum/WeddingAlbum';
import WeddingCalender from '@/components/invitation/WeddingCalender/WeddingCalender';
import WeddingIntro from '@/components/invitation/WeddingIntro/WeddingIntro';
import AppLayout from '@/layouts/AppLayout';
import { useCardDetailQuery } from '@/services/card/queries';
import { useToast } from '@/utils/useToast';
import { color } from '@merried/design-system';
import { Column, Text } from '@merried/ui';
import { flex } from '@merried/utils';
import { OpenGraph } from '@toss/react';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const InvitationDetail = ({ params }: { params: { id: string } }) => {
  const { showToast, toastMessage, toastType } = useToast();
  const startRef = useRef<HTMLDivElement>(null);
  const [showAttend, setShowAttend] = useState(false);

  const { data } = useCardDetailQuery(params.id);

  useEffect(() => {
    if (!startRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => setShowAttend(!entry.isIntersecting),
      { rootMargin: '-20% 0px 0px 0px', threshold: 0 }
    );
    obs.observe(startRef.current);
    return () => obs.disconnect();
  }, []);

  const weddingCardComponentMap = {
    INVITATION_MESSAGE: () =>
      data?.invitationMessage && (
        <Greeting
          pointColor={data?.invitationSetting.pointColor ?? ''}
          font={data?.invitationSetting.font ?? ''}
          title={data.invitationMessage.title ?? ''}
          content={data.invitationMessage.content ?? ''}
        />
      ),
    GROOM_BRIDE_PROFILE: () =>
      data?.groomProfile &&
      data?.brideProfile && (
        <CoupleInfo
          coupleList={[
            {
              fatherName: data?.groomProfile?.fatherName ?? '',
              motherName: data?.groomProfile?.motherName ?? '',
              gender: 'SON',
              name: data?.groomProfile?.name ?? '',
              isFatherDeceased: data?.groomProfile?.isFatherDeceased ?? false,
              isMotherDeceased: data?.groomProfile?.isMotherDeceased ?? false,
            },
            {
              fatherName: data?.brideProfile?.fatherName ?? '',
              motherName: data?.brideProfile?.motherName ?? '',
              gender: 'DAUGHTER',
              name: data?.brideProfile?.name ?? '',
              isFatherDeceased: data?.brideProfile?.isFatherDeceased ?? false,
              isMotherDeceased: data?.brideProfile?.isMotherDeceased ?? false,
            },
          ]}
          pointColor={data?.invitationSetting.pointColor ?? ''}
          font={data?.invitationSetting.font ?? ''}
        />
      ),
    WEDDING_DATE: () =>
      data?.weddingInfo && (
        <WeddingCalender
          date={data?.weddingInfo?.date ?? ''}
          pointColor={data?.invitationSetting.pointColor ?? ''}
          font={data?.invitationSetting.font ?? ''}
          weddingHallName={data?.weddingInfo?.weddingHallName ?? ''}
          isCalendarVisible={data?.weddingInfo?.isCalendarVisible ?? false}
        />
      ),
    PHOTO_GALLERY: () =>
      data?.photoGallery && (
        <WeddingAlbum
          albumList={data?.photoGallery?.urls ?? []}
          title={data?.photoGallery?.title ?? ''}
          pointColor={data?.invitationSetting.pointColor ?? ''}
          font={data?.invitationSetting.font ?? ''}
        />
      ),
    VIDEO_GALLERY: () =>
      data?.videoGallery && (
        <WeddingIntro
          url={data?.videoGallery?.url ?? ''}
          title={data?.videoGallery?.title ?? ''}
          font={data?.invitationSetting.font ?? ''}
        />
      ),
    LOCATION_GUIDE: () =>
      data?.locationGuide && (
        <Direction
          address={data?.locationGuide?.address ?? ''}
          detailAddress={data?.weddingInfo?.weddingHallName ?? ''}
          methods={{
            버스: data?.locationGuide?.busDetail,
            지하철: data?.locationGuide?.subwayDetail,
            자가용: data?.locationGuide?.parkingDetail,
          }}
          pointColor={data?.invitationSetting.pointColor ?? ''}
        />
      ),
    ACCOUNT_INFO: () =>
      data?.accountInfo && (
        <Account
          groomAccounts={[
            {
              bank: data?.accountInfo?.groom?.bankName ?? '',
              account: data?.accountInfo?.groom?.accountNumber ?? '',
              name: data?.accountInfo?.groom?.accountHolderName ?? '',
            },
            {
              bank: data?.accountInfo?.groomFather?.bankName ?? '',
              account: data?.accountInfo?.groomFather?.accountNumber ?? '',
              name: data?.accountInfo?.groomFather?.accountHolderName ?? '',
            },
            {
              bank: data?.accountInfo?.groomMother?.bankName ?? '',
              account: data?.accountInfo?.groomMother?.accountNumber ?? '',
              name: data?.accountInfo?.groomMother?.accountHolderName ?? '',
            },
          ]}
          brideAccounts={[
            {
              bank: data?.accountInfo?.bride?.bankName ?? '',
              account: data?.accountInfo?.bride?.accountNumber ?? '',
              name: data?.accountInfo?.bride?.accountHolderName ?? '',
            },
            {
              bank: data?.accountInfo?.brideFather?.bankName ?? '',
              account: data?.accountInfo?.brideFather?.accountNumber ?? '',
              name: data?.accountInfo?.brideFather?.accountHolderName ?? '',
            },
            {
              bank: data?.accountInfo?.brideMother?.bankName ?? '',
              account: data?.accountInfo?.brideMother?.accountNumber ?? '',
              name: data?.accountInfo?.brideMother?.accountHolderName ?? '',
            },
          ]}
          pointColor={data?.invitationSetting.pointColor ?? ''}
          font={data?.invitationSetting.font ?? ''}
          title={data?.accountInfo?.title ?? ''}
          content={data?.accountInfo?.content ?? ''}
          id={params.id}
        />
      ),
    GUEST_NOTICE: () =>
      data?.guestNotice && (
        <Guide
          title={data?.guestNotice?.title ?? ''}
          content={data?.guestNotice?.content ?? ''}
          font={data?.invitationSetting.font ?? ''}
        />
      ),
    GUEST_BOOK: () =>
      data?.guestBook && (
        <GuestBook
          pointColor={data?.invitationSetting.pointColor ?? ''}
          font={data?.invitationSetting.font ?? ''}
          title={data?.guestBook?.title ?? ''}
          masterPassword={data?.guestBook?.masterPassword ?? ''}
          id={params.id}
        />
      ),
    GUEST_SNAPSHOTS: () =>
      data?.guestSnapshots && (
        <GuestSnapShot
          font={data?.invitationSetting.font ?? ''}
          title={data?.guestSnapshots?.title ?? ''}
          id={params.id}
        />
      ),
    SHARE_URL_STYLE: () =>
      data?.shareUrlStyle && (
        <>
          <ShareURL
            pointColor={data?.invitationSetting.pointColor ?? ''}
            id={params.id}
          />
          <OpenGraph
            title={data?.shareUrlStyle?.title}
            description={data?.shareUrlStyle?.content}
            imageUrl={data?.shareUrlStyle?.thumbnailUrl}
          />
        </>
      ),
  };

  return (
    <AppLayout backgroundColor={color.G0}>
      <Column width="100%" alignItems="center">
        <div ref={startRef} style={{ width: '100%' }}>
          <StartBackground
            groom={data?.groomProfile?.name ?? ''}
            bride={data?.brideProfile?.name ?? ''}
            date={data?.weddingInfo?.date ?? ''}
            picture={data?.mainPageSetting.picture ?? ''}
            letteringColor={data?.mainPageSetting.letteringColor ?? ''}
            lettering={
              Array.isArray(data?.mainPageSetting.lettering)
                ? data?.mainPageSetting.lettering
                : typeof data?.mainPageSetting.lettering === 'string'
                  ? [data?.mainPageSetting.lettering]
                  : ['']
            }
            font={data?.mainPageSetting.font ?? ''}
            templateId={data?.templateId ?? ''}
          />
        </div>
        <StyledInvitation>
          {data?.componentOrders
            ?.sort((a, b) => a.order - b.order)
            .map(
              (orderObj) => weddingCardComponentMap[orderObj.componentType]?.() ?? null
            )}
          <Text fontType="P4" color={color.G80}>
            COPYRIGHT Kangwon Park. All rights reserved.
          </Text>
        </StyledInvitation>
      </Column>
      {showAttend && (
        <AttendFloatButton
          pointColor={data?.invitationSetting.pointColor ?? ''}
          id={params.id}
        />
      )}
      {showToast && <Toast type={toastType}>{toastMessage}</Toast>}
    </AppLayout>
  );
};

export default InvitationDetail;

const StyledInvitation = styled.div`
  ${flex({ flexDirection: 'column', alignItems: 'center' })}
  width: 100%;
  height: 100%;
  padding: 32px 12px 100px;
  gap: 100px;
`;
