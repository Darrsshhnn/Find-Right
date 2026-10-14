const assetPathPrefix = "./assets";
const imgButtonForward = `${assetPathPrefix}/e3424.svg`;
const imgSelection = `${assetPathPrefix}/26770.svg`;
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

type ExperienceChoicesProps = {
  className?: string;
  property1?: "Default";
};

function ExperienceChoices({ className, property1 = "Default" }: ExperienceChoicesProps) {
  return (
    <div className={className || "content-stretch cursor-pointer flex gap-[12px] items-start overflow-clip relative w-[758px]"} data-node-id="3:1299">
      <button className="bg-white border border-[rgba(19,11,30,0.5)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[5px] h-[95px] items-start min-w-px overflow-clip p-[12px] relative rounded-[12px]" data-node-id="3:1300" data-name="Experience option">
        <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="3:1301" data-name="Option heading">
          <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] not-italic relative shrink-0 text-[#130b1e] text-[13px] text-left whitespace-nowrap" data-node-id="3:1302">
            Fresher / Entry
          </p>
          <div className="relative shrink-0 size-[14px]" data-node-id="3:1303" data-name="Selection">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSelection} />
          </div>
        </div>
        <p className="[word-break:break-word] font-['Poppins:Regular'] leading-[1.5] not-italic relative shrink-0 text-[#767676] text-[11px] text-left w-full" data-node-id="3:1304">
          New talent, fresh ideas
        </p>
      </button>
      <button className="bg-white border border-[rgba(19,11,30,0.5)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[5px] h-[95px] items-start min-w-px overflow-clip p-[12px] relative rounded-[12px]" data-node-id="3:1305" data-name="Experience option">
        <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="3:1306" data-name="Option heading">
          <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] not-italic relative shrink-0 text-[#130b1e] text-[13px] text-left whitespace-nowrap" data-node-id="3:1307">
            Intermediate
          </p>
          <div className="relative shrink-0 size-[14px]" data-node-id="3:1308" data-name="Selection">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSelection} />
          </div>
        </div>
        <p className="[word-break:break-word] font-['Poppins:Regular'] leading-[1.5] not-italic relative shrink-0 text-[#767676] text-[11px] text-left w-full" data-node-id="3:1309">
          Proven project experience
        </p>
      </button>
      <button className="bg-white border border-[rgba(19,11,30,0.5)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[5px] h-[95px] items-start min-w-px overflow-clip p-[12px] relative rounded-[12px]" data-node-id="3:1310" data-name="Experience option">
        <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="3:1311" data-name="Option heading">
          <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] not-italic relative shrink-0 text-[#130b1e] text-[13px] text-left whitespace-nowrap" data-node-id="3:1312">
            High-level / Expert
          </p>
          <div className="relative shrink-0 size-[14px]" data-node-id="3:1313" data-name="Selection">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSelection} />
          </div>
        </div>
        <p className="[word-break:break-word] font-['Poppins:Regular'] leading-[1.5] not-italic relative shrink-0 text-[#767676] text-[11px] text-left w-full" data-node-id="3:1314">
          Deep expertise, complex work
        </p>
      </button>
    </div>
  );
}

type JobTypeSelectionProps = {
  className?: string;
  property1?: "Default";
};

function JobTypeSelection({ className, property1 = "Default" }: JobTypeSelectionProps) {
  return (
    <div className={className || "bg-[#f9f6fd] content-stretch flex h-[44px] items-center justify-center p-[2px] relative rounded-[8px] w-[758px]"} data-node-id="3:1277">
      <div className="bg-[#8a38f5] content-stretch flex flex-[1_0_0] h-full items-center justify-center min-w-px p-[8px] relative rounded-[7px]" data-node-id="3:1278" data-name="Left Option">
        <p className="[word-break:break-word] font-['Poppins:Regular'] leading-[24px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap" data-node-id="3:1279">
          Freelance project
        </p>
      </div>
      <button className="content-stretch cursor-pointer flex flex-[1_0_0] h-full items-center justify-center min-w-px p-[8px] relative" data-node-id="3:1280" data-name="Middle Option">
        <p className="[word-break:break-word] font-['Poppins:Regular'] leading-[24px] not-italic relative shrink-0 text-[14px] text-black text-center whitespace-nowrap" data-node-id="3:1281">
          Part-time
        </p>
      </button>
      <button className="content-stretch cursor-pointer flex flex-[1_0_0] h-full items-center justify-center min-w-px p-[8px] relative" data-node-id="3:1282" data-name="Right Option">
        <p className="[word-break:break-word] font-['Poppins:Regular'] leading-[24px] not-italic relative shrink-0 text-[14px] text-black text-center whitespace-nowrap" data-node-id="3:1283">
          Full-time
        </p>
      </button>
    </div>
  );
}

type CategoryChoicesProps = {
  className?: string;
  property1?: "Default" | "Variant5";
};

function CategoryChoices({ className, property1 = "Default" }: CategoryChoicesProps) {
  const isVariant5 = property1 === "Variant5";
  return (
    <div className={className || `content-stretch flex gap-[12px] items-center relative w-[758px] ${isVariant5 ? "cursor-pointer" : ""}`} id={isVariant5 ? "node-3_1267" : "node-3_1231"}>
      {property1 === "Default" && (
        <div className="bg-[#f9f6fd] border-2 border-[#8a38f5] border-solid content-stretch flex flex-[1_0_0] h-[94px] items-center justify-center min-w-px p-[12px] relative rounded-[12px]" data-node-id="3:1232">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Poppins:Medium'] leading-[normal] min-w-px not-italic relative text-[#8a38f5] text-[14px] text-center" data-node-id="3:1233">
            UI/UX Design
          </p>
        </div>
      )}
      <button className={`bg-white border border-[rgba(19,11,30,0.5)] border-solid content-stretch flex flex-[1_0_0] h-[94px] items-center justify-center min-w-px p-[12px] relative rounded-[12px] ${isVariant5 ? "" : "cursor-pointer"}`} id={isVariant5 ? "node-3_1268" : "node-3_1234"}>
        <p className="[word-break:break-word] flex-[1_0_0] font-['Poppins:Medium'] leading-[normal] min-w-px not-italic relative text-[#130b1e] text-[14px] text-center" id={isVariant5 ? "node-3_1269" : "node-3_1235"}>
          {isVariant5 ? "UI/UX Design" : "Graphic Design"}
        </p>
      </button>
      <button className={`bg-white border border-[rgba(19,11,30,0.5)] border-solid content-stretch flex flex-[1_0_0] h-[94px] items-center justify-center min-w-px p-[12px] relative rounded-[12px] ${isVariant5 ? "" : "cursor-pointer"}`} id={isVariant5 ? "node-3_1270" : "node-3_1236"}>
        <p className="[word-break:break-word] flex-[1_0_0] font-['Poppins:Medium'] leading-[normal] min-w-px not-italic relative text-[#130b1e] text-[14px] text-center" id={isVariant5 ? "node-3_1271" : "node-3_1237"}>
          {isVariant5 ? "Graphic Design" : "Product Design"}
        </p>
      </button>
      <button className={`bg-white border border-[rgba(19,11,30,0.5)] border-solid content-stretch flex flex-[1_0_0] h-[94px] items-center justify-center min-w-px p-[12px] relative rounded-[12px] ${isVariant5 ? "" : "cursor-pointer"}`} id={isVariant5 ? "node-3_1272" : "node-3_1238"}>
        <p className="[word-break:break-word] flex-[1_0_0] font-['Poppins:Medium'] leading-[normal] min-w-px not-italic relative text-[#130b1e] text-[14px] text-center" id={isVariant5 ? "node-3_1273" : "node-3_1239"}>
          {isVariant5 ? "Product Design" : "Motion Design"}
        </p>
      </button>
      {isVariant5 && (
        <button className="bg-white border border-[rgba(19,11,30,0.5)] border-solid content-stretch flex flex-[1_0_0] h-[94px] items-center justify-center min-w-px p-[12px] relative rounded-[12px]" data-node-id="3:1274">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Poppins:Medium'] leading-[normal] min-w-px not-italic relative text-[#130b1e] text-[14px] text-center" data-node-id="3:1275">
            Motion Design
          </p>
        </button>
      )}
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

export default function PostAJob1() {
  return (
    <div className="bg-[#fefbfc] relative size-full" data-node-id="3:4803" data-name="post a job 1">
      <BgAnimation className="-translate-x-1/2 absolute bottom-[-0.08px] h-[839.076px] left-[calc(50%+0.23px)] w-[1515.797px]" />
      <div className="-translate-x-1/2 absolute bg-white border border-[rgba(0,0,0,0.3)] border-solid content-stretch flex flex-col gap-[25px] h-[740px] items-center justify-center left-[calc(50%+0.33px)] overflow-clip px-[80px] rounded-[28px] top-[102px] w-[920px]" data-node-id="3:4805">
        <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-node-id="3:4806">
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="3:4807">
            <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] not-italic relative shrink-0 text-[#767676] text-[16px] whitespace-nowrap" data-node-id="3:4808">
              Step 1/4 : Job Details
            </p>
          </div>
          <div className="h-0 relative shrink-0 w-[760px]" data-node-id="3:4809">
            <div className="absolute inset-[-0.5px_0]">
              <img alt="" className="block max-w-none size-full" src={imgVector4} />
            </div>
          </div>
        </div>
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-center leading-[normal] not-italic relative shrink-0 text-center w-[474px]" data-node-id="3:4810">
          <p className="font-['Poppins:Medium'] relative shrink-0 text-[#130b1e] text-[32px] w-full" data-node-id="3:4811">
            Let’s find the right talent
          </p>
          <p className="font-['Poppins:Regular'] relative shrink-0 text-[#807a88] text-[14px] w-full" data-node-id="3:4812">
            Choose the kind of work and experience your project needs.
          </p>
        </div>
        <div className="content-stretch flex flex-col gap-[20px] items-start min-h-[410px] overflow-clip relative shrink-0 w-full" data-node-id="3:4813" data-name="Form content">
          <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-node-id="3:4814" data-name="Job category">
            <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-node-id="3:4815" data-name="Field label">
              <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] not-italic relative shrink-0 text-[#130b1e] text-[15px] whitespace-nowrap" data-node-id="3:4816">
                Job category
              </p>
            </div>
            <CategoryChoices className="content-stretch cursor-pointer flex gap-[12px] items-center relative shrink-0 w-[758px]" property1="Variant5" />
          </div>
          <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-node-id="3:4818" data-name="Job type">
            <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-node-id="3:4819" data-name="Field label">
              <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] not-italic relative shrink-0 text-[#130b1e] text-[15px] whitespace-nowrap" data-node-id="3:4820">
                Job type
              </p>
            </div>
            <JobTypeSelection className="bg-[#f9f6fd] content-stretch flex h-[44px] items-center justify-center p-[2px] relative rounded-[8px] shrink-0 w-[758px]" />
          </div>
          <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-node-id="3:4822" data-name="Required experience">
            <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-node-id="3:4823" data-name="Field label">
              <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] not-italic relative shrink-0 text-[#130b1e] text-[15px] whitespace-nowrap" data-node-id="3:4824">
                Required experience level
              </p>
            </div>
            <ExperienceChoices className="content-stretch cursor-pointer flex gap-[12px] items-start overflow-clip relative shrink-0 w-[758px]" />
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0 w-full" data-node-id="3:4826">
          <div className="h-0 relative shrink-0 w-[760px]" data-node-id="3:4827">
            <div className="absolute inset-[-0.5px_0]">
              <img alt="" className="block max-w-none size-full" src={imgVector4} />
            </div>
          </div>
          <div className="content-stretch cursor-pointer flex items-start justify-between relative shrink-0 w-full" data-node-id="3:4828">
            <BackButton className="[word-break:break-word] content-stretch flex font-['Poppins:Medium'] gap-[5px] h-[40px] items-center justify-center leading-[0] relative shrink-0 text-[#767676] text-left w-[100px] whitespace-nowrap" />
            <a className="content-stretch flex items-center relative shrink-0" data-node-id="3:4830">
              <div className="bg-[#8a38f5] content-stretch flex gap-[4px] h-[40px] items-center justify-center p-[10px] relative rounded-[12px] shrink-0 w-[150px]" data-node-id="3:4831" role="button" tabIndex="0" data-name="Continue">
                <div className="[word-break:break-word] flex flex-col font-['Poppins:Medium'] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-left text-white whitespace-nowrap" data-node-id="I3:4831;183:552">
                  <p className="leading-[normal]">Continue</p>
                </div>
                <ButtonForward className="relative shrink-0 size-[24px]" />
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bg-white border-[0.5px] border-black border-solid h-[72px] left-[calc(50%+0.33px)] overflow-clip top-0 w-[1440px]" data-node-id="3:4832">
        <div className="-translate-y-1/2 absolute content-stretch flex items-center justify-between left-[32.5px] top-1/2 w-[1380px]" data-node-id="3:4833">
          <div className="content-stretch flex gap-[11px] items-center relative shrink-0" data-node-id="3:4834">
            <div className="bg-white border border-black border-solid overflow-clip relative rounded-[8px] shrink-0 size-[50px]" data-node-id="3:4835" data-name="Logo">
              <div className="absolute h-[33.151px] left-[2.5px] top-[8.5px] w-[44.874px]" data-node-id="3:4836">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup14} />
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[18px] text-black whitespace-nowrap" data-node-id="3:4840">
              FindRight
            </p>
          </div>
          <div className="content-stretch flex gap-[19px] items-center relative shrink-0" data-node-id="3:4841">
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-node-id="3:4842">
              <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap" data-node-id="3:4843">
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