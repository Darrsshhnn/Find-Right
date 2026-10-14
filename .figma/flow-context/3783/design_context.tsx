const assetPathPrefix = "./assets";
const imgButtonForward = `${assetPathPrefix}/e3424.svg`;
const imgBuilding = `${assetPathPrefix}/d70ba.svg`;
const imgUser = `${assetPathPrefix}/c9fd0.svg`;
const imgVector5 = `${assetPathPrefix}/e5d86.png`;
const imgVector6 = `${assetPathPrefix}/693dd.png`;
const imgEllipse20 = `${assetPathPrefix}/b03fc.png`;
const imgEllipse21 = `${assetPathPrefix}/c0470.png`;
const imgVector4 = `${assetPathPrefix}/d6cdb.svg`;
const imgLine = `${assetPathPrefix}/d54f1.svg`;
const imgBriefcase = `${assetPathPrefix}/78ed7.svg`;
const imgLayers = `${assetPathPrefix}/d4b47.svg`;
const imgSparkles = `${assetPathPrefix}/6f606.svg`;
const imgGroup14 = `${assetPathPrefix}/fea4d.svg`;

function GetStarted({ className }: { className?: string }) {
  return (
    <div className={className || "bg-[#8324ff] content-stretch flex h-[37px] items-center justify-center px-[30px] py-[10px] relative rounded-[8px] w-[110px]"} data-node-id="3:30" data-name="Get started">
      <p className="[word-break:break-word] font-['Poppins:SemiBold'] leading-[1.6] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap" data-node-id="3:31">
        Get started
      </p>
    </div>
  );
}

function ButtonForward({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[24px]"} data-node-id="3:755" data-name="Button/ Forward">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgButtonForward} />
    </div>
  );
}

function BackButton({ className }: { className?: string }) {
  return (
    <button className={className || "content-stretch cursor-pointer flex gap-[5px] h-[40px] items-center justify-center relative text-[#767676] text-left w-[100px]"} data-node-id="3:566">
      <div className="flex flex-col font-medium justify-center relative shrink-0 text-[26px]" data-node-id="3:567">
        <p className="leading-[normal]">←</p>
      </div>
      <div className="flex flex-col justify-center not-italic relative shrink-0 text-[16px]" data-node-id="3:568">
        <p className="leading-[normal]">Back</p>
      </div>
    </button>
  );
}

type Component2CardsProps = {
  className?: string;
  property1?: "Default";
};

function Component2Cards({ className, property1 = "Default" }: Component2CardsProps) {
  return (
    <div className={className || "cursor-pointer h-[87px] relative w-[767px]"} data-node-id="3:645">
      <button className="absolute bg-white border border-[#767676] border-solid content-stretch flex gap-[16px] items-center left-0 p-[20px] rounded-[12px] top-0 w-[371.5px]" data-node-id="3:646" data-name="Component 3">
        <div className="bg-[#767676] content-stretch flex flex-col items-center justify-center relative rounded-[8px] shrink-0 size-[40px]" data-node-id="3:647" data-name="icon-wrapper">
          <div className="relative shrink-0 size-[20px]" data-node-id="3:648" data-name="building">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBuilding} />
          </div>
        </div>
        <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[normal] min-w-px not-italic relative text-left" data-node-id="3:650" data-name="card-text">
          <p className="font-['Poppins:SemiBold'] relative shrink-0 text-[#130b1e] text-[15px] w-full" data-node-id="3:651">{`I'm hiring for a company`}</p>
          <p className="font-['Poppins:Regular'] relative shrink-0 text-[#767676] text-[13px] w-full" data-node-id="3:652">
            Brand, startup, or agency
          </p>
        </div>
      </button>
      <button className="absolute bg-white border border-[#767676] border-solid content-stretch flex gap-[16px] items-center left-[396.5px] p-[20px] rounded-[12px] top-0 w-[370.5px]" data-node-id="3:653" data-name="Component 4">
        <div className="bg-[#767676] content-stretch flex flex-col items-center justify-center relative rounded-[8px] shrink-0 size-[40px]" data-node-id="3:654" data-name="icon-wrapper">
          <div className="relative shrink-0 size-[20px]" data-node-id="3:655" data-name="user">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgUser} />
          </div>
        </div>
        <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[normal] min-w-px not-italic relative text-left" data-node-id="3:657" data-name="card-text">
          <p className="font-['Poppins:SemiBold'] relative shrink-0 text-[#130b1e] text-[15px] w-full" data-node-id="3:658">{`It's a personal project`}</p>
          <p className="font-['Poppins:Regular'] relative shrink-0 text-[#767676] text-[13px] w-full" data-node-id="3:659">
            Independent or hobby work
          </p>
        </div>
      </button>
    </div>
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

export default function HiringFor() {
  return (
    <div className="bg-[#fefbfc] relative size-full" data-node-id="3:3783" data-name="Hiring for ?">
      <BgAnimation className="-translate-x-1/2 absolute bottom-[-0.08px] h-[839.076px] left-[calc(50%+0.23px)] w-[1515.797px]" />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-white border border-[rgba(19,11,30,0.5)] border-solid content-stretch flex flex-col gap-[25px] h-[800px] items-center justify-center left-[calc(50%+0.33px)] overflow-clip px-[80px] rounded-[28px] top-[calc(50%+40.5px)] w-[920px]" data-node-id="3:3785">
        <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-node-id="3:3786">
          <div className="[word-break:break-word] content-stretch flex font-['Poppins:Medium'] items-center justify-between leading-[normal] not-italic relative shrink-0 text-[16px] w-full whitespace-nowrap" data-node-id="3:3787">
            <p className="relative shrink-0 text-[#767676]" data-node-id="3:3788">
              Step 2/4 : Client profile
            </p>
            <p className="relative shrink-0 text-[#8a38f5]" data-node-id="3:3789">
              FindRight Onboarding
            </p>
          </div>
          <div className="h-0 relative shrink-0 w-[760px]" data-node-id="3:3790">
            <div className="absolute inset-[-0.5px_0]">
              <img alt="" className="block max-w-none size-full" src={imgVector4} />
            </div>
          </div>
        </div>
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-center leading-[normal] not-italic relative shrink-0 text-center w-[474px]" data-node-id="3:3791">
          <p className="font-['Poppins:Medium'] relative shrink-0 text-[#130b1e] text-[32px] w-full" data-node-id="3:3792">
            Who are you hiring for?
          </p>
          <p className="font-['Poppins:Regular'] relative shrink-0 text-[#767676] text-[16px] w-full" data-node-id="3:3793">
            We customize your project templates and invoice receipts based on your setup.
          </p>
        </div>
        <Component2Cards className="cursor-pointer h-[87px] relative shrink-0 w-[767px]" />
        <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-node-id="3:3795" data-name="form-fields-row">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[5px] h-[73px] items-start min-w-px relative" data-node-id="3:3796" data-name="Filling">
            <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] min-w-full not-italic relative shrink-0 text-[#130b1e] text-[16px] w-[min-content]" data-node-id="3:3797">
              Full Name
            </p>
            <div className="bg-[#fefbfc] border border-[#767676] border-solid h-[44px] overflow-clip relative rounded-[12px] shrink-0 w-[371px]" data-node-id="3:3798">
              <p className="[word-break:break-word] absolute font-['Poppins:Medium'] leading-[normal] left-[8px] not-italic text-[#767676] text-[16px] top-[9px] whitespace-nowrap" data-node-id="3:3799">
                Peter Parker
              </p>
            </div>
          </div>
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[5px] h-[73px] items-start min-w-px relative" data-node-id="3:3800">
            <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] min-w-full not-italic relative shrink-0 text-[16px] text-black w-[min-content]" data-node-id="3:3801">
              Website
            </p>
            <div className="bg-[#fefbfc] border border-[#767676] border-solid h-[44px] overflow-clip relative rounded-[12px] shrink-0 w-[371px]" data-node-id="3:3802">
              <p className="[word-break:break-word] absolute font-['Poppins:Medium'] leading-[normal] left-[8px] not-italic text-[#767676] text-[16px] top-[9px] whitespace-nowrap" data-node-id="3:3803">{`http//example.com`}</p>
            </div>
          </div>
        </div>
        <div className="h-0 relative shrink-0 w-full" data-node-id="3:3804" data-name="Line">
          <div className="absolute inset-[-1px_0_0_0]">
            <img alt="" className="block max-w-none size-full" src={imgLine} />
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-node-id="3:3805" data-name="section-usage">
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] not-italic relative shrink-0 w-full" data-node-id="3:3806" data-name="heading-group">
            <p className="font-['Poppins:Bold'] relative shrink-0 text-[#130b1e] text-[18px] w-full" data-node-id="3:3807">
              What do you plan to order services for?
            </p>
            <p className="font-['Poppins:Regular'] relative shrink-0 text-[#767676] text-[14px] w-full" data-node-id="3:3808">{`There's something for everyone`}</p>
          </div>
          <div className="content-stretch cursor-pointer flex gap-[16px] items-start relative shrink-0 w-[758px]" data-node-id="3:3809" data-name="services-grid">
            <button className="bg-white border border-[#767676] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-center min-w-px p-[16px] relative rounded-[12px]" data-node-id="I3:3809;174:3671" data-name="service-card-1">
              <div className="border border-[#8a38f5] border-solid content-stretch flex flex-col h-[72px] items-center justify-center relative rounded-[8px] shrink-0 w-full" data-node-id="I3:3809;174:3672" data-name="graphic-block-active">
                <div className="relative shrink-0 size-[28px]" data-node-id="I3:3809;174:3673" data-name="briefcase">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBriefcase} />
                </div>
              </div>
              <p className="[word-break:break-word] font-['Poppins:SemiBold'] leading-[normal] not-italic relative shrink-0 text-[#130b1e] text-[14px] text-center w-full" data-node-id="I3:3809;174:3675">
                Primary job or business
              </p>
            </button>
            <button className="bg-white border border-[#767676] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-center min-w-px p-[16px] relative rounded-[12px]" data-node-id="I3:3809;174:3676" data-name="service-card-2">
              <div className="bg-white border border-[#8a38f5] border-solid content-stretch flex flex-col h-[72px] items-center justify-center relative rounded-[8px] shrink-0 w-full" data-node-id="I3:3809;174:3677" data-name="graphic-block-inactive">
                <div className="relative shrink-0 size-[28px]" data-node-id="I3:3809;174:3678" data-name="layers">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgLayers} />
                </div>
              </div>
              <p className="[word-break:break-word] font-['Poppins:SemiBold'] leading-[normal] not-italic relative shrink-0 text-[#130b1e] text-[14px] text-center w-full" data-node-id="I3:3809;174:3680">
                Secondary business
              </p>
            </button>
            <button className="bg-white border border-[#767676] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-center min-w-px p-[16px] relative rounded-[12px]" data-node-id="I3:3809;174:3681" data-name="service-card-3">
              <div className="border border-[#8a38f5] border-solid content-stretch flex flex-col h-[72px] items-center justify-center relative rounded-[8px] shrink-0 w-full" data-node-id="I3:3809;174:3682" data-name="graphic-block-inactive">
                <div className="relative shrink-0 size-[28px]" data-node-id="I3:3809;174:3683" data-name="sparkles">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSparkles} />
                </div>
              </div>
              <p className="[word-break:break-word] font-['Poppins:SemiBold'] leading-[normal] not-italic relative shrink-0 text-[#130b1e] text-[14px] text-center w-full" data-node-id="I3:3809;174:3685">
                Non-business needs
              </p>
            </button>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0 w-full" data-node-id="3:3810">
          <div className="h-0 relative shrink-0 w-[760px]" data-node-id="3:3811">
            <div className="absolute inset-[-0.5px_0]">
              <img alt="" className="block max-w-none size-full" src={imgVector4} />
            </div>
          </div>
          <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-node-id="3:3812">
            <BackButton className="[word-break:break-word] content-stretch cursor-pointer flex font-['Poppins:Medium'] gap-[5px] h-[40px] items-center justify-center leading-[0] relative shrink-0 text-[#767676] text-left w-[100px] whitespace-nowrap" />
            <div className="content-stretch flex items-center relative shrink-0" data-node-id="3:3814">
              <a className="bg-[#8a38f5] content-stretch cursor-pointer flex gap-[4px] h-[40px] items-center justify-center p-[10px] relative rounded-[12px] shrink-0 w-[150px]" data-node-id="3:3815" data-name="Continue">
                <div className="[word-break:break-word] flex flex-col font-['Poppins:Medium'] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-left text-white whitespace-nowrap" data-node-id="I3:3815;183:552">
                  <p className="leading-[normal]">Continue</p>
                </div>
                <ButtonForward className="relative shrink-0 size-[24px]" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bg-white border-[0.5px] border-black border-solid h-[72px] left-[calc(50%+0.33px)] overflow-clip top-0 w-[1440px]" data-node-id="3:3816">
        <div className="-translate-y-1/2 absolute content-stretch flex items-center justify-between left-[32.5px] top-1/2 w-[1380px]" data-node-id="3:3817">
          <div className="content-stretch flex gap-[11px] items-center relative shrink-0" data-node-id="3:3818">
            <div className="bg-white border border-black border-solid overflow-clip relative rounded-[8px] shrink-0 size-[50px]" data-node-id="3:3819" data-name="Logo">
              <div className="absolute h-[33.151px] left-[2.5px] top-[8.5px] w-[44.874px]" data-node-id="3:3820">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup14} />
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[18px] text-black whitespace-nowrap" data-node-id="3:3824">
              FindRight
            </p>
          </div>
          <div className="content-stretch flex gap-[19px] items-center relative shrink-0" data-node-id="3:3825">
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-node-id="3:3826">
              <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap" data-node-id="3:3827">
                Sign in
              </p>
            </div>
            <GetStarted className="bg-[#8324ff] content-stretch flex h-[37px] items-center justify-center px-[30px] py-[10px] relative rounded-[8px] shrink-0 w-[110px]" />
          </div>
        </div>
      </div>
    </div>
  );
}