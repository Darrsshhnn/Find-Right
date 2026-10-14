const assetPathPrefix = "./assets";
const imgButtonForward = `${assetPathPrefix}/e3424.svg`;
const imgVector5 = `${assetPathPrefix}/e5d86.png`;
const imgVector6 = `${assetPathPrefix}/693dd.png`;
const imgEllipse20 = `${assetPathPrefix}/b03fc.png`;
const imgEllipse21 = `${assetPathPrefix}/c0470.png`;
const imgVector4 = `${assetPathPrefix}/2bb2c.svg`;
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

type SkillsProps = {
  className?: string;
  property1?: "Frame 34";
};

function Skills({ className, property1 = "Frame 34" }: SkillsProps) {
  return (
    <button className={className || "bg-[#fefbfc] border border-[#767676] border-solid content-stretch flex items-center justify-center overflow-clip px-[27px] py-[6px] relative rounded-[12px]"} data-node-id="3:791">
      <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-left whitespace-nowrap" data-node-id="3:792">
        UI/UX Design
      </p>
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

export default function DesignerProfile() {
  return (
    <div className="bg-[#fefbfc] relative size-full" data-node-id="3:4003" data-name="Designer Profile">
      <BgAnimation className="-translate-x-1/2 absolute bottom-[-0.08px] h-[839.076px] left-[calc(50%+0.23px)] w-[1515.797px]" />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-white border border-[rgba(0,0,0,0.3)] border-solid content-stretch flex flex-col gap-[25px] items-start left-[calc(50%+0.33px)] overflow-clip px-[80px] py-[40px] rounded-[28px] shadow-[0px_4px_11.3px_0px_rgba(0,0,0,0.35)] top-[calc(50%+3px)] w-[920px]" data-node-id="3:4005">
        <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-node-id="3:4006">
          <div className="[word-break:break-word] content-stretch flex font-['Poppins:Medium'] items-center justify-between leading-[normal] not-italic relative shrink-0 text-[16px] w-full whitespace-nowrap" data-node-id="3:4007">
            <p className="relative shrink-0 text-[#767676]" data-node-id="3:4008">
              Step 2/3 : Designer Profile
            </p>
            <p className="relative shrink-0 text-[#8a38f5]" data-node-id="3:4009">
              FindRight Onboarding
            </p>
          </div>
          <div className="h-0 relative shrink-0 w-[760px]" data-node-id="3:4010">
            <div className="absolute inset-[-0.5px_0]">
              <img alt="" className="block max-w-none size-full" src={imgVector4} />
            </div>
          </div>
        </div>
        <div className="[word-break:break-word] content-stretch flex flex-col font-['Poppins:Medium'] gap-[4px] items-start leading-[normal] not-italic relative shrink-0 whitespace-nowrap" data-node-id="3:4011">
          <p className="relative shrink-0 text-[32px] text-black text-center" data-node-id="3:4012">
            Tell us about your craft
          </p>
          <p className="relative shrink-0 text-[16px] text-[rgba(19,11,30,0.5)]" data-node-id="3:4013">
            Clients search for verified designers using skills, location and transparent AI disclosures.
          </p>
        </div>
        <div className="cursor-pointer gap-x-[40px] gap-y-[25px] grid grid-cols-[repeat(2,fit-content(100%))] grid-rows-[repeat(2,fit-content(100%))] relative shrink-0 w-full" data-node-id="3:4014">
          <button className="col-1 content-stretch flex flex-col gap-[5px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-node-id="3:4015" data-name="Text Filling">
            <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] min-w-full not-italic relative shrink-0 text-[#130b1e] text-[16px] text-left w-[min-content]" data-node-id="I3:4015;207:1225">
              Full Name
            </p>
            <div className="bg-[#fefbfc] border border-[#767676] border-solid h-[44px] overflow-clip relative rounded-[12px] shrink-0 w-[360px]" data-node-id="I3:4015;207:1226">
              <p className="[word-break:break-word] absolute font-['Poppins:Medium'] leading-[normal] left-[8px] not-italic text-[#767676] text-[16px] text-left top-[9px] whitespace-nowrap" data-node-id="I3:4015;207:1228">
                ex. Yash Stark
              </p>
            </div>
          </button>
          <button className="col-2 content-stretch flex flex-col gap-[5px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-node-id="3:4016" data-name="Text Filling">
            <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] min-w-full not-italic relative shrink-0 text-[#130b1e] text-[16px] text-left w-[min-content]" data-node-id="I3:4016;207:1225">
              Location
            </p>
            <div className="bg-[#fefbfc] border border-[#767676] border-solid h-[44px] overflow-clip relative rounded-[12px] shrink-0 w-[360px]" data-node-id="I3:4016;207:1226">
              <p className="[word-break:break-word] absolute font-['Poppins:Medium'] leading-[normal] left-[8px] not-italic text-[#767676] text-[16px] text-left top-[9px] whitespace-nowrap" data-node-id="I3:4016;207:1228">{`ex. Bopal, Ahmedabad, India `}</p>
            </div>
          </button>
          <button className="col-[1/span_2] content-stretch flex flex-col gap-[5px] items-start justify-self-stretch relative row-2 self-stretch shrink-0" data-node-id="3:4017" data-name="Text Filling">
            <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] min-w-full not-italic relative shrink-0 text-[#130b1e] text-[16px] text-left w-[min-content]" data-node-id="I3:4017;207:1225">
              Years of Professional Design Experience
            </p>
            <div className="bg-[#fefbfc] border border-[#767676] border-solid h-[44px] overflow-clip relative rounded-[12px] shrink-0 w-[360px]" data-node-id="I3:4017;207:1226">
              <p className="[word-break:break-word] absolute font-['Poppins:Medium'] leading-[normal] left-[8px] not-italic text-[#767676] text-[16px] text-left top-[9px] whitespace-nowrap" data-node-id="I3:4017;207:1228">
                ex. 0 years UX Designer
              </p>
            </div>
          </button>
        </div>
        <div className="content-stretch flex flex-col gap-[5px] items-start relative shrink-0 w-[688px]" data-node-id="3:4018">
          <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] not-italic relative shrink-0 text-[16px] text-black w-full" data-node-id="3:4019">{`Primary skills & creative specialties (multi-select)`}</p>
          <div className="content-stretch cursor-pointer flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-node-id="3:4020">
            <div className="content-stretch flex gap-[15px] items-center relative shrink-0 w-full" data-node-id="3:4021">
              <Skills className="bg-[#fefbfc] border border-[#767676] border-solid content-stretch flex items-center justify-center overflow-clip px-[27px] py-[6px] relative rounded-[12px] shrink-0" />
              <button className="bg-[#fefbfc] border border-[#767676] border-solid content-stretch flex items-center justify-center overflow-clip px-[27px] py-[6px] relative rounded-[12px] shrink-0" data-node-id="3:4023" data-name="Skills">
                <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-left whitespace-nowrap" data-node-id="I3:4023;207:1250">
                  Brand Identity
                </p>
              </button>
              <button className="bg-[#fefbfc] border border-[#767676] border-solid content-stretch flex items-center justify-center overflow-clip px-[27px] py-[6px] relative rounded-[12px] shrink-0" data-node-id="3:4024" data-name="Skills">
                <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-left whitespace-nowrap" data-node-id="I3:4024;207:1250">
                  Typography
                </p>
              </button>
              <button className="bg-[#fefbfc] border border-[#767676] border-solid content-stretch flex items-center justify-center overflow-clip px-[27px] py-[6px] relative rounded-[12px] shrink-0" data-node-id="3:4025" data-name="Skills">
                <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-left whitespace-nowrap" data-node-id="I3:4025;207:1250">
                  Logo Design
                </p>
              </button>
            </div>
            <div className="content-stretch flex gap-[15px] items-center relative shrink-0" data-node-id="3:4026">
              <button className="bg-[#fefbfc] border border-[#767676] border-solid content-stretch flex items-center justify-center overflow-clip px-[27px] py-[6px] relative rounded-[12px] shrink-0" data-node-id="3:4027" data-name="Skills">
                <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-left whitespace-nowrap" data-node-id="I3:4027;207:1250">
                  Vector Illustrations
                </p>
              </button>
              <button className="bg-[#fefbfc] border border-[#767676] border-solid content-stretch flex items-center justify-center overflow-clip px-[27px] py-[6px] relative rounded-[12px] shrink-0" data-node-id="3:4028" data-name="Skills">
                <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-left whitespace-nowrap" data-node-id="I3:4028;207:1250">{`Packaging & Dielines`}</p>
              </button>
              <button className="bg-[#fefbfc] border border-[#767676] border-solid content-stretch flex items-center justify-center overflow-clip px-[27px] py-[6px] relative rounded-[12px] shrink-0" data-node-id="3:4029" data-name="Skills">
                <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-left whitespace-nowrap" data-node-id="I3:4029;207:1250">
                  Motion Graphics
                </p>
              </button>
            </div>
            <div className="content-stretch flex gap-[15px] items-center relative shrink-0" data-node-id="3:4030">
              <button className="bg-[#fefbfc] border border-[#767676] border-solid content-stretch flex items-center justify-center overflow-clip px-[27px] py-[6px] relative rounded-[12px] shrink-0" data-node-id="3:4031" data-name="Skills">
                <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-left whitespace-nowrap" data-node-id="I3:4031;207:1250">
                  Design Systems
                </p>
              </button>
              <button className="bg-[#fefbfc] border border-[#767676] border-solid content-stretch flex items-center justify-center overflow-clip px-[27px] py-[6px] relative rounded-[12px] shrink-0" data-node-id="3:4032" data-name="Skills">
                <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-left whitespace-nowrap" data-node-id="I3:4032;207:1250">
                  Mobile/IoS Design
                </p>
              </button>
              <button className="bg-[#fefbfc] border border-[#767676] border-solid content-stretch flex items-center justify-center overflow-clip px-[27px] py-[6px] relative rounded-[12px] shrink-0" data-node-id="3:4033" data-name="Skills">
                <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-left whitespace-nowrap" data-node-id="I3:4033;207:1250">
                  Saas Design
                </p>
              </button>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0 w-full" data-node-id="3:4034">
          <div className="h-0 relative shrink-0 w-[760px]" data-node-id="3:4035">
            <div className="absolute inset-[-0.5px_0]">
              <img alt="" className="block max-w-none size-full" src={imgVector4} />
            </div>
          </div>
          <div className="content-stretch cursor-pointer flex items-start justify-between relative shrink-0 w-full" data-node-id="3:4036">
            <BackButton className="[word-break:break-word] content-stretch flex font-['Poppins:Medium'] gap-[5px] h-[40px] items-center justify-center leading-[0] relative shrink-0 text-[#767676] text-left w-[100px] whitespace-nowrap" />
            <div className="content-stretch flex gap-[10px] items-center relative shrink-0" data-node-id="3:4038">
              <SkipToDashboard className="border border-[#767676] border-solid content-stretch flex h-[40px] items-center justify-center relative rounded-[12px] shrink-0 w-[180px]" />
              <a className="bg-[#8a38f5] content-stretch flex gap-[4px] h-[40px] items-center justify-center p-[10px] relative rounded-[12px] shrink-0 w-[150px]" data-node-id="3:4040" data-name="Continue">
                <div className="[word-break:break-word] flex flex-col font-['Poppins:Medium'] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-left text-white whitespace-nowrap" data-node-id="I3:4040;183:552">
                  <p className="leading-[normal]">Continue</p>
                </div>
                <ButtonForward className="relative shrink-0 size-[24px]" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bg-white border-[0.5px] border-black border-solid h-[72px] left-[calc(50%+0.33px)] overflow-clip top-0 w-[1440px]" data-node-id="3:4041">
        <div className="-translate-y-1/2 absolute content-stretch flex items-center justify-between left-[32.5px] top-1/2 w-[1380px]" data-node-id="3:4042">
          <div className="content-stretch flex gap-[11px] items-center relative shrink-0" data-node-id="3:4043">
            <div className="bg-white border border-black border-solid overflow-clip relative rounded-[8px] shrink-0 size-[50px]" data-node-id="3:4044" data-name="Logo">
              <div className="absolute h-[33.151px] left-[2.5px] top-[8.5px] w-[44.874px]" data-node-id="3:4045">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup14} />
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[18px] text-black whitespace-nowrap" data-node-id="3:4049">
              FindRight
            </p>
          </div>
          <div className="content-stretch flex gap-[19px] items-center relative shrink-0" data-node-id="3:4050">
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-node-id="3:4051">
              <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap" data-node-id="3:4052">
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