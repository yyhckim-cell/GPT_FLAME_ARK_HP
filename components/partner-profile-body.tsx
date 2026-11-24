import type { PartnerProfile } from "./partner-profiles";

export default function PartnerProfileBody({ profile }: { profile: PartnerProfile }) {
  return (
    <div className="partner-dialog-body">
      {profile.keywords.length > 0 && (
        <div className="partner-dialog-keywords" aria-label="주요 연구 분야">
          {profile.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}
        </div>
      )}

      {profile.pending ? (
        <section className="partner-dialog-pending" aria-label="기관 소개 준비 상태">
          <h3>소개자료 준비 중</h3>
          <p>현재 제공된 자료만으로는 기관 소개 및 주요 개발 내용을 충분히 확인하기 어렵습니다. 상세 소개 자료가 확인되는 대로 이곳에 반영하겠습니다.</p>
        </section>
      ) : (
        <div className="partner-dialog-columns">
          <section className="partner-dialog-about" aria-labelledby="partner-about-title">
            <h3 id="partner-about-title">기관 소개</h3>
            {profile.introduction && <p>{profile.introduction}</p>}
            {profile.capabilities && profile.capabilities.length > 0 && (
              <div className="partner-capabilities" aria-label="기관 주요 역량">
                {profile.capabilities.map((item) => (
                  <div key={item.label}>
                    <strong>{item.label}</strong>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {profile.developments && profile.developments.length > 0 && (
            <section className="partner-dialog-tech" aria-labelledby="partner-development-title">
              <h3 id="partner-development-title">주요 연구 및 개발 내용</h3>
              {profile.developments.map((development, index) => (
                <div className="partner-tech-item" key={development.title}>
                  <span className="partner-tech-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h4>{development.title}</h4>
                    <p>{development.description}</p>
                    {development.stages && development.stages.length > 0 && (
                      <div className="partner-tech-flow" aria-label={`${development.title} 주요 단계`}>
                        {development.stages.map((stage) => <span key={stage}>{stage}</span>)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>
      )}
      <p className="partner-dialog-source">제공받은 FLAME-ARK 기관소개 자료를 바탕으로 정리했습니다.</p>
    </div>
  );
}
