const assetPathPrefix = "./assets";
const imgVector5 = `${assetPathPrefix}/e5d86.png`;
const imgVector6 = `${assetPathPrefix}/693dd.png`;
const imgEllipse20 = `${assetPathPrefix}/b03fc.png`;
const imgEllipse21 = `${assetPathPrefix}/c0470.png`;
const imgShadow = `${assetPathPrefix}/208fd.svg`;
const imgGroup14 = `${assetPathPrefix}/3aa95.svg`;
const imgLine1 = `${assetPathPrefix}/f44ad.svg`;
const imgLine2 = `${assetPathPrefix}/066c9.svg`;
const imgGroup = `${assetPathPrefix}/4fead.svg`;
const imgGroup1 = `${assetPathPrefix}/4e027.svg`;
const imgGroup15 = `${assetPathPrefix}/48100.svg`;
const imgBoxiconsMailOpenFilled = `${assetPathPrefix}/5ab47.svg`;
const imgGroup16 = `${assetPathPrefix}/e88ce.svg`;

function TextFilling({ className }: { className?: string }) {
  return (
    <button className={className || "content-stretch flex flex-col gap-[5px] items-start relative w-[360px]"} data-node-id="3:57">
      <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] min-w-full not-italic relative shrink-0 text-[#130b1e] text-[16px] text-left w-[min-content]" data-node-id="3:58">
        Full Name
      </p>
      <div className="bg-[#fefbfc] border border-[#767676] border-solid h-[44px] overflow-clip relative rounded-[12px] shrink-0 w-[360px]" data-node-id="3:59">
        <p className="[word-break:break-word] absolute font-['Poppins:Medium'] leading-[normal] left-[8px] not-italic text-[#767676] text-[16px] text-left top-[9px] whitespace-nowrap" data-node-id="3:60">
          ex. Peter Parker
        </p>
      </div>
    </button>
  );
}

type BgAnimationProps = {
  className?: string;
  property1?: "Frame 45";
};

function BgAnimation({ className, property1 = "Frame 45" }: BgAnimationProps) {
  return (
    <div className={className || "h-[839.076px] relative w-[1515.797px]"} data-node-id="3:39">
      <div className="absolute flex h-[361.076px] items-center justify-center left-0 top-[478px] w-[320.792px]" data-node-id="3:40">
        <div className="flex-none rotate-[3.09deg]">
          <div className="h-[345.264px] opacity-20 relative w-[302.618px]">
            <div className="absolute inset-[-7.94%_-8.39%_-6.92%_-8.39%]">
              <img alt="" className="block max-w-none size-full" height="396.564" src={imgVector5} width="353.418" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[363.359px] items-center justify-center left-[10px] top-0 w-[355.784px]" data-node-id="3:41">
        <div className="flex-none rotate-[-122.8deg]">
          <div className="h-[247.46px] opacity-20 relative w-[272.802px]">
            <div className="absolute inset-[-11.07%_-9.31%_-9.66%_-9.31%]">
              <img alt="" className="block max-w-none size-full" height="298.76" src={imgVector6} width="323.602" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex items-center justify-center left-[1054.23px] size-[461.563px] top-[277px]" data-node-id="3:42">
        <div className="flex-none rotate-[115.43deg]">
          <div className="opacity-20 relative size-[346.378px]">
            <div className="absolute inset-[-6.9%]">
              <img alt="" className="block max-w-none size-full" height="394.178" src={imgEllipse20} width="394.178" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex items-center justify-center left-[965px] size-[303.727px] top-[522.88px]" data-node-id="3:43">
        <div className="flex-none rotate-[-152.94deg]">
          <div className="opacity-20 relative size-[225.747px]">
            <div className="absolute inset-[-12.14%_-11.25%_-10.59%_-11.25%]">
              <img alt="" className="block max-w-none size-full" height="277.047" src={imgEllipse21} width="276.547" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WelcomeScreen() {
  return (
    <div className="bg-[#fefbfc] relative size-full" data-node-id="3:3829" data-name="Welcome Screen">
      <BgAnimation className="-translate-x-1/2 absolute bottom-[-0.08px] h-[839.076px] left-[calc(50%+0.23px)] w-[1515.797px]" />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-white border-[1.163px] border-[rgba(0,0,0,0.3)] border-solid h-[628px] left-[calc(50%+0.33px)] overflow-clip rounded-[14px] top-[calc(50%+23.5px)] w-[884px]" data-node-id="3:3831" data-name="Log in frame">
        <div className="absolute h-[51.355px] left-[688.47px] top-[22.1px] w-[171.488px]" data-node-id="3:3832" data-name="Component 1">
          <div className="absolute bg-[#8a38f5] inset-0 rounded-[6.308px]" data-node-id="I3:3832;119:115" />
          <button className="absolute bg-white content-stretch cursor-pointer flex inset-[18.64%_47.59%_18.86%_8.02%] items-center justify-center px-[18.341px] py-[9.171px] rounded-[6.308px]" data-node-id="I3:3832;119:116">
            <p className="[word-break:break-word] font-['Poppins:SemiBold'] leading-[normal] not-italic relative shrink-0 text-[#130b1e] text-[13.96px] text-left whitespace-nowrap" data-node-id="I3:3832;119:117">
              Sign up
            </p>
          </button>
          <p className="[word-break:break-word] absolute font-['Poppins:SemiBold'] inset-[29.96%_9.85%_29.28%_65.74%] leading-[normal] not-italic text-[#fefbfc] text-[13.96px] text-center whitespace-nowrap" data-node-id="I3:3832;119:118">
            Log in
          </p>
        </div>
        <div className="absolute bg-[#130b1e] h-[625.674px] left-0 rounded-bl-[12.793px] rounded-tl-[12.793px] top-0 w-[430.296px]" data-node-id="3:3833" />
        <div className="-translate-x-1/2 absolute contents left-[calc(50%+209.89px)] top-[588.46px]" data-node-id="3:3834" data-name="Your payment stays safe in escrow until you approve the work.">
          <p className="[word-break:break-word] absolute font-['Poppins:Regular'] leading-[normal] left-[calc(50%+64.89px)] not-italic text-[#767676] text-[9.304px] top-[589.62px] whitespace-nowrap" data-node-id="3:3835">
            Your payment stays safe in escrow until you approve the work.
          </p>
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%-120.6px)] size-[268.644px] top-[calc(50%-208.75px)]" data-node-id="3:3836" data-name="shadow">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgShadow} />
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%-336.92px)] size-[268.644px] top-[calc(50%+206.43px)]" data-node-id="3:3837" data-name="shadow">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgShadow} />
        </div>
        <div className="absolute content-stretch flex flex-col gap-[52.333px] items-start left-[36.05px] top-[44.19px] w-[360.519px]" data-node-id="3:3838">
          <div className="content-stretch flex flex-col gap-[20.933px] items-start relative shrink-0 w-[133.741px]" data-node-id="3:3839">
            <div className="content-stretch flex gap-[6.482px] items-center relative shrink-0" data-node-id="3:3840">
              <div className="bg-[#fefbfc] border-[#130b1e] border-[0.589px] border-solid overflow-clip relative rounded-[4.714px] shrink-0 size-[29.462px]" data-node-id="3:3841" data-name="Logo">
                <div className="absolute h-[19.534px] left-[1.47px] top-[5.01px] w-[26.44px]" data-node-id="3:3842">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup14} />
                </div>
              </div>
              <p className="[word-break:break-word] font-['Poppins:Bold'] leading-[normal] not-italic relative shrink-0 text-[#fefbfc] text-[10.606px] whitespace-nowrap" data-node-id="3:3846">
                FindRight
              </p>
            </div>
            <div className="bg-[rgba(138,56,245,0.3)] border-[#8a38f5] border-[0.581px] border-solid content-stretch flex h-[29.074px] items-center justify-center px-[23.259px] py-[11.63px] relative rounded-[58.148px] shrink-0 w-full" data-node-id="3:3847">
              <p className="[word-break:break-word] font-['Poppins:Regular'] leading-[normal] not-italic relative shrink-0 text-[11.63px] text-white whitespace-nowrap" data-node-id="3:3848">
                Designer account
              </p>
            </div>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[15.119px] items-start leading-[0] not-italic relative shrink-0 w-full" data-node-id="3:3849">
            <div className="font-['Poppins:Bold'] relative shrink-0 text-[#fefbfc] text-[0px] whitespace-nowrap" data-node-id="3:3850">
              <p className="leading-[41.867px] mb-0 text-[37.215px]">Real designers,</p>
              <p className="leading-[41.867px] mb-0 text-[37.215px]">Real craft.</p>
              <p className="font-['Poppins:Medium'] leading-[41.867px] text-[#8a38f5] text-[37.215px]">Protected trust.</p>
            </div>
            <div className="font-['Poppins:Regular'] min-w-full relative shrink-0 text-[11.63px] text-white w-[min-content] whitespace-pre-wrap" data-node-id="3:3851">
              <p className="leading-[normal] mb-0">Join a creative marketplace where transparent AI disclosures,</p>
              <p className="leading-[normal] mb-0">{`human taste, and milestone escrow protect your work and `}</p>
              <p className="leading-[normal]">{`brand. `}</p>
            </div>
          </div>
        </div>
        <div className="absolute content-stretch flex flex-col gap-[19.77px] items-start left-[466.35px] top-[133.74px] w-[384.941px]" data-node-id="3:3852">
          <div className="content-stretch flex flex-col gap-[3.489px] h-[51px] items-start relative shrink-0 w-[250px]" data-node-id="3:3853">
            <div className="h-[31.4px] relative shrink-0 w-full" data-node-id="3:3854" data-name="create an account">
              <p className="[word-break:break-word] absolute font-['Poppins:Medium'] leading-[normal] left-0 not-italic text-[26px] text-black top-0 whitespace-nowrap" data-node-id="3:3855">
                Create an account
              </p>
            </div>
            <div className="h-[17.444px] relative shrink-0 w-[153.511px]" data-node-id="3:3856" data-name="Sighing up as client(hirer)">
              <p className="[word-break:break-word] absolute font-['Poppins:Medium'] leading-[normal] left-0 not-italic text-[#767676] text-[14px] top-0 whitespace-nowrap" data-node-id="3:3857">
                Sighing up as client(hirer)
              </p>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[5px] h-[73px] items-start relative shrink-0 w-full" data-node-id="3:3858" data-name="Filling">
            <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] min-w-full not-italic relative shrink-0 text-[#130b1e] text-[16px] w-[min-content]" data-node-id="3:3859">
              Full Name
            </p>
            <div className="bg-[#fefbfc] border border-[#767676] border-solid h-[44px] overflow-clip relative rounded-[12px] shrink-0 w-[384px]" data-node-id="3:3860">
              <p className="[word-break:break-word] absolute font-['Poppins:Medium'] leading-[normal] left-[8px] not-italic text-[#767676] text-[16px] top-[9px] whitespace-nowrap" data-node-id="3:3861">
                Peter Parker
              </p>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[5px] h-[73px] items-start relative shrink-0 w-full" data-node-id="3:3862">
            <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] min-w-full not-italic relative shrink-0 text-[16px] text-black w-[min-content]" data-node-id="3:3863">
              Email
            </p>
            <div className="bg-[#fefbfc] border border-[#767676] border-solid h-[44px] overflow-clip relative rounded-[12px] shrink-0 w-[384px]" data-node-id="3:3864">
              <p className="[word-break:break-word] absolute font-['Poppins:Medium'] leading-[normal] left-[8px] not-italic text-[#767676] text-[16px] top-[9px] whitespace-nowrap" data-node-id="3:3865">
                example@gmail.com
              </p>
            </div>
          </div>
          <a className="bg-[#8a38f5] content-stretch cursor-pointer flex h-[34px] items-center justify-center p-[11.63px] relative rounded-[6px] shrink-0 w-[385px]" data-node-id="3:3866">
            <p className="[word-break:break-word] font-['Poppins:SemiBold'] leading-[normal] not-italic relative shrink-0 text-[#fefbfc] text-[18.61px] text-left whitespace-nowrap" data-node-id="I3:3866;161:2669">
              Continue
            </p>
          </a>
          <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-[385px]" data-node-id="3:3867" data-name="line">
            <div className="flex items-center justify-center relative shrink-0" data-node-id="3:3868">
              <div className="flex-none rotate-180">
                <div className="h-0 relative w-[174.444px]">
                  <div className="absolute inset-[-0.58px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={imgLine1} />
                  </div>
                </div>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Poppins:Regular'] leading-[normal] not-italic relative shrink-0 text-[#767676] text-[9.304px] whitespace-nowrap" data-node-id="3:3869">
              OR
            </p>
            <div className="flex items-center justify-center relative shrink-0" data-node-id="3:3870">
              <div className="flex-none rotate-180">
                <div className="h-0 relative w-[170.956px]">
                  <div className="absolute inset-[-0.58px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={imgLine2} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[8px] h-[26px] items-center relative shrink-0 w-[385px]" data-node-id="3:3871">
            <div className="border-[#130b1e] border-[0.581px] border-solid content-stretch flex gap-[11.63px] h-[25.585px] items-center justify-center px-[23.259px] py-[11.63px] relative rounded-[8px] shrink-0" data-node-id="3:3872">
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="I3:3872;174:2831">
                <div className="col-1 ml-0 mt-0 overflow-clip relative row-1 size-[17.444px]" data-node-id="I3:3872;299:231" data-name="akar-icons:google-contained-fill">
                  <div className="absolute contents inset-0" data-node-id="I3:3872;299:232" data-name="Group">
                    <div className="absolute contents inset-0" data-node-id="I3:3872;299:233" data-name="Clip path group">
                      <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[15px_15px]" data-node-id="I3:3872;299:236" style={{ maskImage: `url("${imgGroup}")` }} data-name="Group">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup1} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Poppins:Regular'] leading-[normal] not-italic relative shrink-0 text-[#130b1e] text-[13.96px] whitespace-nowrap" data-node-id="I3:3872;174:2840">{`Google `}</p>
            </div>
            <div className="border-[#130b1e] border-[0.581px] border-solid content-stretch flex gap-[11.63px] h-[25.585px] items-center justify-center px-[23.259px] py-[11.63px] relative rounded-[8px] shrink-0" data-node-id="3:3873">
              <div className="relative shrink-0 size-[17.444px]" data-node-id="I3:3873;174:2842">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup15} />
              </div>
              <p className="[word-break:break-word] font-['Poppins:Regular'] leading-[normal] not-italic relative shrink-0 text-[#130b1e] text-[13.96px] whitespace-nowrap" data-node-id="I3:3873;174:2851">
                LinkedIn
              </p>
            </div>
            <div className="border-[#130b1e] border-[0.581px] border-solid content-stretch flex gap-[11.63px] h-[25.585px] items-center justify-center px-[23.259px] py-[11.63px] relative rounded-[8px] shrink-0" data-node-id="3:3874">
              <div className="relative shrink-0 size-[17.444px]" data-node-id="I3:3874;299:289" data-name="boxicons:mail-open-filled">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBoxiconsMailOpenFilled} />
              </div>
              <p className="[word-break:break-word] font-['Poppins:Regular'] leading-[normal] not-italic relative shrink-0 text-[#130b1e] text-[13.96px] whitespace-nowrap" data-node-id="I3:3874;174:2862">{`Mail `}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bg-[#fefbfc] border-[#130b1e] border-[0.5px] border-solid h-[72px] left-0 overflow-clip top-0 w-[1440px]" data-node-id="3:3875" data-name="navbar">
        <div className="-translate-y-1/2 absolute content-stretch flex items-center justify-between left-[32.5px] top-1/2 w-[1380px]" data-node-id="3:3876">
          <div className="content-stretch flex gap-[11px] items-center relative shrink-0" data-node-id="3:3877">
            <div className="bg-[#fefbfc] border border-[#130b1e] border-solid overflow-clip relative rounded-[8px] shrink-0 size-[50px]" data-node-id="3:3878" data-name="Logo">
              <div className="absolute h-[33.151px] left-[2.5px] top-[8.5px] w-[44.874px]" data-node-id="3:3879">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup16} />
              </div>
            </div>
            <p className="[word-break:break-word] font-['Poppins:Bold'] leading-[normal] not-italic relative shrink-0 text-[#130b1e] text-[18px] whitespace-nowrap" data-node-id="3:3883">
              FindRight
            </p>
          </div>
          <div className="content-stretch flex gap-[19px] items-center relative shrink-0" data-node-id="3:3884">
            <div className="content-stretch flex items-center justify-center p-[10px] relative shrink-0" data-node-id="3:3885" data-name="Sign in">
              <p className="[word-break:break-word] font-['Poppins:SemiBold'] leading-[normal] not-italic relative shrink-0 text-[#130b1e] text-[16px] whitespace-nowrap" data-node-id="I3:3885;161:2593">
                Sign in
              </p>
            </div>
            <div className="bg-[#8a38f5] content-stretch flex h-[37px] items-center justify-center px-[30px] py-[10px] relative rounded-[8px] shrink-0 w-[110px]" data-node-id="3:3886" data-name="Get started">
              <p className="[word-break:break-word] font-['Poppins:SemiBold'] leading-[1.6] not-italic relative shrink-0 text-[#fefbfc] text-[14px] text-center whitespace-nowrap" data-node-id="I3:3886;150:326">
                Get started
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-white border-[1.163px] border-[rgba(0,0,0,0.3)] border-solid h-[628px] left-[calc(50%+0.33px)] overflow-clip rounded-[14px] top-[calc(50%+23.5px)] w-[884px]" data-node-id="3:3887" data-name="Log in frame">
        <div className="absolute bg-[#130b1e] h-[625.674px] left-0 rounded-bl-[12.793px] rounded-tl-[12.793px] top-0 w-[430.296px]" data-node-id="3:3888" />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%-120.6px)] size-[268.644px] top-[calc(50%-208.75px)]" data-node-id="3:3889" data-name="shadow">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgShadow} />
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%-336.92px)] size-[268.644px] top-[calc(50%+206.43px)]" data-node-id="3:3890" data-name="shadow">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgShadow} />
        </div>
        <div className="absolute content-stretch flex flex-col gap-[52.333px] items-start left-[36.05px] top-[44.19px] w-[360.519px]" data-node-id="3:3891">
          <div className="content-stretch flex flex-col gap-[20.933px] items-start relative shrink-0 w-[133.741px]" data-node-id="3:3892">
            <div className="content-stretch flex gap-[6.482px] items-center relative shrink-0" data-node-id="3:3893">
              <div className="bg-[#fefbfc] border-[#130b1e] border-[0.589px] border-solid overflow-clip relative rounded-[4.714px] shrink-0 size-[29.462px]" data-node-id="3:3894" data-name="Logo">
                <div className="absolute h-[19.534px] left-[1.47px] top-[5.01px] w-[26.44px]" data-node-id="3:3895">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup14} />
                </div>
              </div>
              <p className="[word-break:break-word] font-['Poppins:Bold'] leading-[normal] not-italic relative shrink-0 text-[#fefbfc] text-[10.606px] whitespace-nowrap" data-node-id="3:3899">
                FindRight
              </p>
            </div>
            <div className="bg-[rgba(138,56,245,0.3)] border-[#8a38f5] border-[0.581px] border-solid content-stretch flex h-[29.074px] items-center justify-center px-[23.259px] py-[11.63px] relative rounded-[58.148px] shrink-0 w-full" data-node-id="3:3900">
              <p className="[word-break:break-word] font-['Poppins:Regular'] leading-[normal] not-italic relative shrink-0 text-[11.63px] text-white whitespace-nowrap" data-node-id="3:3901">
                Designer Account
              </p>
            </div>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[15.119px] items-start leading-[0] not-italic relative shrink-0 w-full" data-node-id="3:3902">
            <div className="font-['Poppins:Bold'] relative shrink-0 text-[#fefbfc] text-[0px] whitespace-nowrap" data-node-id="3:3903">
              <p className="leading-[41.867px] mb-0 text-[37.215px]">Real designers,</p>
              <p className="leading-[41.867px] mb-0 text-[37.215px]">Real craft.</p>
              <p className="font-['Poppins:Medium'] leading-[41.867px] text-[#8a38f5] text-[37.215px]">Protected trust.</p>
            </div>
            <div className="font-['Poppins:Regular'] min-w-full relative shrink-0 text-[11.63px] text-white w-[min-content] whitespace-pre-wrap" data-node-id="3:3904">
              <p className="leading-[normal] mb-0">Join a creative marketplace where transparent AI disclosures,</p>
              <p className="leading-[normal] mb-0">{`human taste, and milestone escrow protect your work and `}</p>
              <p className="leading-[normal]">{`brand. `}</p>
            </div>
          </div>
        </div>
        <div className="absolute bg-white h-[626px] left-[429.84px] top-[-0.16px] w-[453px]" data-node-id="3:3905">
          <div className="absolute h-[51.355px] left-[258.64px] top-[22.26px] w-[171.488px]" data-node-id="3:3906" data-name="Component 1">
            <div className="absolute bg-[#8a38f5] inset-0 rounded-[7.336px]" data-node-id="3:3907" />
            <div className="absolute bg-white content-stretch flex inset-[18.64%_47.59%_18.86%_8.02%] items-center justify-center px-[18.341px] py-[9.171px] rounded-[7.336px]" data-node-id="3:3908">
              <p className="[word-break:break-word] font-['Poppins:SemiBold'] leading-[normal] not-italic relative shrink-0 text-[#130b1e] text-[13.956px] whitespace-nowrap" data-node-id="3:3909">
                Sign up
              </p>
            </div>
            <p className="[word-break:break-word] absolute font-['Poppins:SemiBold'] inset-[29.96%_10.36%_29.15%_65.15%] leading-[normal] not-italic text-[#fefbfc] text-[13.956px] text-center whitespace-nowrap" data-node-id="3:3910">
              Log in
            </p>
          </div>
          <div className="absolute content-stretch flex flex-col gap-[19.77px] items-start left-[36.51px] top-[133.9px] w-[384.941px]" data-node-id="3:3911">
            <div className="content-stretch flex flex-col gap-[3.489px] h-[51px] items-start relative shrink-0 w-[250px]" data-node-id="3:3912">
              <div className="h-[31.4px] relative shrink-0 w-full" data-node-id="3:3913" data-name="create an account">
                <p className="[word-break:break-word] absolute font-['Poppins:Medium'] leading-[normal] left-0 not-italic text-[26px] text-black top-0 whitespace-nowrap" data-node-id="3:3914">
                  Create an account
                </p>
              </div>
              <div className="h-[17.444px] relative shrink-0 w-[153.511px]" data-node-id="3:3915" data-name="Sighing up as client(hirer)">
                <p className="[word-break:break-word] absolute font-['Poppins:Medium'] leading-[normal] left-0 not-italic text-[#767676] text-[14px] top-0 whitespace-nowrap" data-node-id="3:3916">
                  Sighing up as client(hirer)
                </p>
              </div>
            </div>
            <TextFilling className="content-stretch cursor-pointer flex flex-col gap-[5px] h-[73px] items-start relative shrink-0 w-full" />
            <button className="content-stretch cursor-pointer flex flex-col gap-[5px] h-[73px] items-start relative shrink-0 w-full" data-node-id="3:3918" data-name="Text Filling">
              <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] min-w-full not-italic relative shrink-0 text-[#130b1e] text-[16px] text-left w-[min-content]" data-node-id="I3:3918;207:1225">
                Email
              </p>
              <div className="bg-[#fefbfc] border border-[#767676] border-solid h-[44px] overflow-clip relative rounded-[12px] shrink-0 w-[360px]" data-node-id="I3:3918;207:1226">
                <p className="[word-break:break-word] absolute font-['Poppins:Medium'] leading-[normal] left-[8px] not-italic text-[#767676] text-[16px] text-left top-[9px] whitespace-nowrap" data-node-id="I3:3918;207:1228">
                  example@gmail.com
                </p>
              </div>
            </button>
            <a className="bg-[#8a38f5] content-stretch cursor-pointer flex h-[34px] items-center justify-center p-[11.63px] relative rounded-[6px] shrink-0 w-[385px]" data-node-id="3:3919">
              <p className="[word-break:break-word] font-['Poppins:SemiBold'] leading-[normal] not-italic relative shrink-0 text-[#fefbfc] text-[18.61px] text-left whitespace-nowrap" data-node-id="I3:3919;161:2669">
                Continue
              </p>
            </a>
            <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-[385px]" data-node-id="3:3920" data-name="line">
              <div className="flex items-center justify-center relative shrink-0" data-node-id="3:3921">
                <div className="flex-none rotate-180">
                  <div className="h-0 relative w-[174.444px]">
                    <div className="absolute inset-[-0.58px_0_0_0]">
                      <img alt="" className="block max-w-none size-full" src={imgLine1} />
                    </div>
                  </div>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Poppins:Regular'] leading-[normal] not-italic relative shrink-0 text-[#767676] text-[9.304px] whitespace-nowrap" data-node-id="3:3922">
                OR
              </p>
              <div className="flex items-center justify-center relative shrink-0" data-node-id="3:3923">
                <div className="flex-none rotate-180">
                  <div className="h-0 relative w-[170.956px]">
                    <div className="absolute inset-[-0.58px_0_0_0]">
                      <img alt="" className="block max-w-none size-full" src={imgLine2} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-[8px] h-[26px] items-center relative shrink-0 w-[385px]" data-node-id="3:3924">
              <div className="border-[#130b1e] border-[0.581px] border-solid content-stretch flex gap-[11.63px] h-[25.585px] items-center justify-center px-[23.259px] py-[11.63px] relative rounded-[8px] shrink-0" data-node-id="3:3925">
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="I3:3925;174:2831">
                  <div className="col-1 ml-0 mt-0 overflow-clip relative row-1 size-[17.444px]" data-node-id="I3:3925;299:231" data-name="akar-icons:google-contained-fill">
                    <div className="absolute contents inset-0" data-node-id="I3:3925;299:232" data-name="Group">
                      <div className="absolute contents inset-0" data-node-id="I3:3925;299:233" data-name="Clip path group">
                        <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[15px_15px]" data-node-id="I3:3925;299:236" style={{ maskImage: `url("${imgGroup}")` }} data-name="Group">
                          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup1} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Poppins:Regular'] leading-[normal] not-italic relative shrink-0 text-[#130b1e] text-[13.96px] whitespace-nowrap" data-node-id="I3:3925;174:2840">{`Google `}</p>
              </div>
              <div className="border-[#130b1e] border-[0.581px] border-solid content-stretch flex gap-[11.63px] h-[25.585px] items-center justify-center px-[23.259px] py-[11.63px] relative rounded-[8px] shrink-0" data-node-id="3:3926">
                <div className="relative shrink-0 size-[17.444px]" data-node-id="I3:3926;174:2842">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup15} />
                </div>
                <p className="[word-break:break-word] font-['Poppins:Regular'] leading-[normal] not-italic relative shrink-0 text-[#130b1e] text-[13.96px] whitespace-nowrap" data-node-id="I3:3926;174:2851">
                  LinkedIn
                </p>
              </div>
              <div className="border-[#130b1e] border-[0.581px] border-solid content-stretch flex gap-[11.63px] h-[25.585px] items-center justify-center px-[23.259px] py-[11.63px] relative rounded-[8px] shrink-0" data-node-id="3:3927">
                <div className="relative shrink-0 size-[17.444px]" data-node-id="I3:3927;299:289" data-name="boxicons:mail-open-filled">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBoxiconsMailOpenFilled} />
                </div>
                <p className="[word-break:break-word] font-['Poppins:Regular'] leading-[normal] not-italic relative shrink-0 text-[#130b1e] text-[13.96px] whitespace-nowrap" data-node-id="I3:3927;174:2862">{`Mail `}</p>
              </div>
            </div>
          </div>
          <div className="-translate-x-1/2 absolute contents left-[calc(50%-5.61px)] top-[588.62px]" data-node-id="3:3928" data-name="Your payment stays safe in escrow until you approve the work.">
            <p className="[word-break:break-word] absolute font-['Poppins:Regular'] leading-[normal] left-[calc(50%-150.61px)] not-italic text-[#767676] text-[9.304px] top-[588.62px] whitespace-nowrap" data-node-id="3:3929">
              Your payment stays safe in escrow until you approve the work.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}