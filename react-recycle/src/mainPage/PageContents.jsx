import s from '../styles/PageContents.module.css';

const PageContents = () => {
    return (
        <section className={s.sct}>
            <div className={s.d1}>
                <div className={s.d2}>
                    {/* 1 */}
                    <div className={s.d3}>
                        <div className={s.d4}>
                            <div className={s.d5}>
                                <div className={s.d6}><i>AI</i></div>
                                <h2 className={s.h1}><a href='https://teachablemachine.withgoogle.com/models/xzeLom0rm/' className={s.a}>AI 판독기</a></h2>
                                <p className={s.p1}>애매한 재활용을 찍어보자</p>
                            </div>
                        </div>
                    </div>
                    <div className={s.d3}>
                        <div className={s.d4}>
                            <div className={s.d5}>
                                <div className={s.d6}><i>지도</i></div>
                                <h2 className={s.h1}><a href='/map' className={s.a}>중고 가게 / 재활용 기계</a></h2>
                            </div>
                        </div>
                    </div>
                    <div className={s.d3}>
                        <div className={s.d4}>
                            <div className={s.d5}>
                                <div className={s.d6}><i>번호</i></div>
                                <h2 className={s.h1}><a href='/sido' className={s.a}>폐기물 시/군/구 별 <br /> 전화번호</a></h2>
                            </div>
                        </div>
                    </div>
                    <div className={s.d3}>
                        <div className={s.d4}>
                            <div className={s.d5}>
                                <div className={s.d6}><i>용</i></div>
                                <h2 className={s.h1}>간단한 재활용 법</h2>
                            </div>
                        </div>
                    </div>
                    <div className={s.d3}>
                        <div className={s.d4}>
                            <div className={s.d5}>
                                <div className={s.d6}><i>{`< >`}</i></div>
                                <h2 className={s.h1}><a href='/list' className={s.a}>리폼게시판</a></h2>
                            </div>
                        </div>
                    </div>
                    <div className={s.d3}>
                        <div className={s.d4}>
                            <div className={s.d5}>
                                <div className={s.d6}><i>Q/Z</i></div>
                                <h2 className={s.h1}>간단한 재활용 퀴즈</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PageContents;