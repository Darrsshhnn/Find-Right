const assetPathPrefix = "./assets";
const imgVector4 = `${assetPathPrefix}/2bb2c.svg`;
const imgBriefcase = `${assetPathPrefix}/c8d33.svg`;
const imgUncheck = `${assetPathPrefix}/4c147.svg`;
const imgVector5 = `${assetPathPrefix}/59665.svg`;
const imgPenTool = `${assetPathPrefix}/8d5fb.svg`;
const imgVector6 = `${assetPathPrefix}/e5d86.png`;
const imgVector7 = `${assetPathPrefix}/693dd.png`;
const imgEllipse20 = `${assetPathPrefix}/b03fc.png`;
const imgEllipse21 = `${assetPathPrefix}/c0470.png`;
const imgGroup14 = `${assetPathPrefix}/fea4d.svg`;

type ContinueSelectionProps = {
  className?: string;
  icon?: "no";
  property?: "Client";
  state?: "Default";
};

function ContinueSelection({ className, icon = "no", property = "Client", state = "Default" }: ContinueSelectionProps) {
  return (
    <div className={className || "bg-[#8a38f5] content-stretch flex h-[40px] items-center justify-center p-[10px] relative rounded-[12px] w-[150px]"} data-node-id="3:581">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:Medium'] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap" data-node-id="3:582">
        <p className="leading-[normal]">Continue</p>
      </div>
    </div>
  );
}

function SkipToDashboard({ className }: { className?: string }) {
  return (
    <button className={className || "border border-[#767676] border-solid content-stretch cursor-pointer flex h-[40px] items-center justify-center relative rounded-[12px] w-[180px]"} data-node-id="3:573">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:Medium'] justify-center leading-[0] not-italic relative shrink-0 text-[#767676] text-[16px] text-left whitespace-nowrap" data-node-id="3:574">
        <p className="leading-[normal]">Skip to Dashboard</p>
      </div>
    </button>
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

type Component2Props = {
  className?: string;
  property1?: "Frame 7";
};

function Component2({ className, property1 = "Frame 7" }: Component2Props) {
  return (
    <div className={className || "bg-white border border-[rgba(0,0,0,0.3)] border-solid content-stretch flex flex-col gap-[25px] h-[740px] items-center justify-center overflow-clip px-[80px] relative rounded-[28px] w-[920px]"} data-node-id="3:593">
      <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-node-id="3:594">
        <div className="[word-break:break-word] content-stretch flex font-['Poppins:Medium'] items-center justify-between leading-[normal] not-italic relative shrink-0 text-[16px] w-full whitespace-nowrap" data-node-id="3:595">
          <p className="relative shrink-0 text-[#767676]" data-node-id="3:596">
            Step 1/3 : Role Selection
          </p>
          <p className="relative shrink-0 text-[#8a38f5]" data-node-id="3:597">
            FindRight Onboarding
          </p>
        </div>
        <div className="h-0 relative shrink-0 w-[760px]" data-node-id="3:598">
          <div className="absolute inset-[-0.5px_0]">
            <img alt="" className="block max-w-none size-full" src={imgVector4} />
          </div>
        </div>
      </div>
      <div className="[word-break:break-word] content-stretch flex flex-col font-['Poppins:Medium'] gap-[4px] items-center leading-[normal] not-italic relative shrink-0 text-center w-[474px]" data-node-id="3:599">
        <p className="relative shrink-0 text-[32px] text-black w-full" data-node-id="3:600">
          What brings you to Findright?
        </p>
        <p className="relative shrink-0 text-[16px] text-[rgba(19,11,30,0.5)] w-full" data-node-id="3:601">
          We’ll tailor your experience to fir your needs
        </p>
      </div>
      <div className="content-stretch cursor-pointer flex gap-[40px] items-center relative shrink-0 w-full" data-node-id="3:602" data-name="Client / Freelancer Selection">
        <button className="bg-white border-2 border-[rgba(19,11,30,0.5)] border-solid content-stretch flex h-[420px] items-center overflow-clip px-[29px] py-[30px] relative rounded-[20px] shrink-0 w-[360px]" data-node-id="I3:602;160:37">
          <div className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0 w-[301px]" data-node-id="I3:602;160:74">
            <div className="bg-[#fefbfc] border border-[#8a38f5] border-solid content-stretch flex h-[150px] items-center justify-center overflow-clip px-[120px] py-[45px] relative rounded-[20px] shrink-0 w-full" data-node-id="I3:602;160:38">
              <div className="relative shrink-0 size-[40px]" data-node-id="I3:602;160:39" data-name="briefcase">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBriefcase} />
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full" data-node-id="I3:602;160:73">
              <div className="content-stretch flex flex-col gap-[30px] items-start relative shrink-0 w-full" data-node-id="I3:602;160:72">
                <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-node-id="I3:602;160:68">
                  <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="I3:602;160:42">
                    <p className="[word-break:break-word] font-['Poppins:Medium'] h-[27px] leading-[normal] not-italic relative shrink-0 text-[18px] text-black text-left w-[112px]" data-node-id="I3:602;160:43">
                      I am a client
                    </p>
                    <div className="relative shrink-0 size-[24px]" data-node-id="I3:602;160:44" data-name="Uncheck">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgUncheck} />
                    </div>
                  </div>
                  <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] not-italic opacity-60 relative shrink-0 text-[#130b1e] text-[14px] text-left w-[276px]" data-node-id="I3:602;160:60">
                    Find the right designer for your project. Filter by human craft vs AI assistance, manage contracts with protected escrow.
                  </p>
                </div>
                <div className="h-0 relative shrink-0 w-[301px]" data-node-id="I3:602;160:62">
                  <div className="absolute inset-[-0.5px_0]">
                    <img alt="" className="block max-w-none size-full" src={imgVector5} />
                  </div>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] not-italic relative shrink-0 text-[#8a38f5] text-[14px] text-left w-full" data-node-id="I3:602;160:66">
                Hire Creative Talent
              </p>
            </div>
          </div>
        </button>
        <button className="bg-white border-2 border-[rgba(19,11,30,0.5)] border-solid content-stretch flex h-[420px] items-center overflow-clip px-[29px] py-[30px] relative rounded-[20px] shrink-0 w-[360px]" data-node-id="I3:602;160:75">
          <div className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0 w-[301px]" data-node-id="I3:602;160:76">
            <div className="bg-[#fefbfc] border border-[#8a38f5] border-solid content-stretch flex h-[150px] items-center justify-center overflow-clip px-[130px] py-[55px] relative rounded-[20px] shrink-0 w-[300px]" data-node-id="I3:602;160:91">
              <div className="relative shrink-0 size-[40px]" data-node-id="I3:602;160:92" data-name="pen-tool">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPenTool} />
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full" data-node-id="I3:602;160:81">
              <div className="content-stretch flex flex-col gap-[30px] items-start relative shrink-0 w-full" data-node-id="I3:602;160:82">
                <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-node-id="I3:602;160:83">
                  <div className="content-stretch flex items-center justify-between relative shrink-0 w-[300px]" data-node-id="I3:602;160:98">
                    <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] not-italic relative shrink-0 text-[#130b1e] text-[18px] text-left whitespace-nowrap" data-node-id="I3:602;160:99">
                      I am a Freelancer
                    </p>
                    <div className="relative shrink-0 size-[24px]" data-node-id="I3:602;160:108" data-name="Uncheck">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgUncheck} />
                    </div>
                  </div>
                  <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] not-italic opacity-60 relative shrink-0 text-[#130b1e] text-[14px] text-left w-[276px]" data-node-id="I3:602;160:88">
                    Find real projects, build your verified portfolio, get paid. Publicly disclose your AI usage and build durable reputation.
                  </p>
                </div>
                <div className="h-0 relative shrink-0 w-[301px]" data-node-id="I3:602;160:89">
                  <div className="absolute inset-[-0.5px_0]">
                    <img alt="" className="block max-w-none size-full" src={imgVector5} />
                  </div>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] not-italic relative shrink-0 text-[#8a38f5] text-[14px] text-left w-full" data-node-id="I3:602;160:90">{`Start Freelancing & get Verified`}</p>
            </div>
          </div>
        </button>
      </div>
      <div className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0 w-full" data-node-id="3:603">
        <div className="h-0 relative shrink-0 w-[760px]" data-node-id="3:604">
          <div className="absolute inset-[-0.5px_0]">
            <img alt="" className="block max-w-none size-full" src={imgVector4} />
          </div>
        </div>
        <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-node-id="3:605">
          <BackButton className="[word-break:break-word] content-stretch cursor-pointer flex font-['Poppins:Medium'] gap-[5px] h-[40px] items-center justify-center leading-[0] relative shrink-0 text-[#767676] text-left w-[100px] whitespace-nowrap" />
          <div className="content-stretch flex gap-[10px] items-center relative shrink-0" data-node-id="3:607">
            <SkipToDashboard className="border border-[#767676] border-solid content-stretch cursor-pointer flex h-[40px] items-center justify-center relative rounded-[12px] shrink-0 w-[180px]" />
            <ContinueSelection className="bg-[#8a38f5] content-stretch flex h-[40px] items-center justify-center p-[10px] relative rounded-[12px] shrink-0 w-[150px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function GetStarted({ className }: { className?: string }) {
  return (
    <div className={className || "bg-[#8324ff] content-stretch flex h-[37px] items-center justify-center px-[30px] py-[10px] relative rounded-[8px] w-[110px]"} data-node-id="3:30" data-name="Get started">
      <p className="[word-break:break-word] font-['Poppins:SemiBold'] leading-[1.6] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap" data-node-id="3:31">
        Get started
      </p>
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
              <img alt="" className="block max-w-none size-full" height="396.564" src={imgVector6} width="353.418" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[363.359px] items-center justify-center left-[10px] top-0 w-[355.784px]" data-node-id="3:41">
        <div className="flex-none rotate-[-122.8deg]">
          <div className="h-[247.46px] opacity-20 relative w-[272.802px]">
            <div className="absolute inset-[-11.07%_-9.31%_-9.66%_-9.31%]">
              <img alt="" className="block max-w-none size-full" height="298.76" src={imgVector7} width="323.602" />
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

export default function RoleSelection() {
  return (
    <div className="bg-[#fefbfc] relative size-full" data-node-id="3:3767" data-name="Role Selection">
      <BgAnimation className="-translate-x-1/2 absolute bottom-[-0.08px] h-[839.076px] left-[calc(50%+0.23px)] w-[1515.797px]" />
      <div className="-translate-x-1/2 absolute bg-white border-[0.5px] border-black border-solid h-[72px] left-[calc(50%+0.33px)] overflow-clip top-0 w-[1440px]" data-node-id="3:3769">
        <div className="-translate-y-1/2 absolute content-stretch flex items-center justify-between left-[32.5px] top-1/2 w-[1380px]" data-node-id="3:3770">
          <div className="content-stretch flex gap-[11px] items-center relative shrink-0" data-node-id="3:3771">
            <div className="bg-white border border-black border-solid overflow-clip relative rounded-[8px] shrink-0 size-[50px]" data-node-id="3:3772" data-name="Logo">
              <div className="absolute h-[33.151px] left-[2.5px] top-[8.5px] w-[44.874px]" data-node-id="3:3773">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup14} />
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[18px] text-black whitespace-nowrap" data-node-id="3:3777">
              FindRight
            </p>
          </div>
          <div className="content-stretch flex gap-[19px] items-center relative shrink-0" data-node-id="3:3778">
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-node-id="3:3779">
              <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap" data-node-id="3:3780">
                Sign in
              </p>
            </div>
            <GetStarted className="bg-[#8324ff] content-stretch flex h-[37px] items-center justify-center px-[30px] py-[10px] relative rounded-[8px] shrink-0 w-[110px]" />
          </div>
        </div>
      </div>
      <Component2 className="-translate-x-1/2 -translate-y-1/2 absolute bg-white border border-[rgba(0,0,0,0.3)] border-solid content-stretch flex flex-col gap-[25px] h-[740px] items-center justify-center left-[calc(50%+0.33px)] overflow-clip px-[80px] rounded-[28px] top-[calc(50%+30.5px)] w-[920px]" />
    </div>
  );
}