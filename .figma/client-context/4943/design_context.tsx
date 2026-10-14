const assetPathPrefix = "./assets";
const imgButtonForward = `${assetPathPrefix}/e3424.svg`;
const imgVector5 = `${assetPathPrefix}/e5d86.png`;
const imgVector6 = `${assetPathPrefix}/693dd.png`;
const imgEllipse20 = `${assetPathPrefix}/b03fc.png`;
const imgEllipse21 = `${assetPathPrefix}/c0470.png`;
const imgVector4 = `${assetPathPrefix}/2bb2c.svg`;
const imgFileText = `${assetPathPrefix}/d9418.svg`;
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

export default function PostAJob4() {
  return (
    <div className="bg-[#fefbfc] relative size-full" data-node-id="3:4943" data-name="post a job 4">
      <BgAnimation className="-translate-x-1/2 absolute bottom-[-0.08px] h-[839.076px] left-[calc(50%+0.23px)] w-[1515.797px]" />
      <div className="-translate-x-1/2 absolute bg-white border border-[rgba(0,0,0,0.3)] border-solid content-stretch flex flex-col gap-[25px] h-[740px] items-center justify-center left-[calc(50%+0.33px)] overflow-clip px-[80px] rounded-[28px] top-[102px] w-[920px]" data-node-id="3:4945">
        <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-node-id="3:4946">
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="3:4947">
            <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[0] not-italic relative shrink-0 text-[#767676] text-[16px] whitespace-nowrap" data-node-id="3:4948">
              <span className="leading-[normal]">Step 4/4 : Pr</span>
              <span className="leading-[normal]">{`eview & post`}</span>
            </p>
          </div>
          <div className="h-0 relative shrink-0 w-[760px]" data-node-id="3:4949">
            <div className="absolute inset-[-0.5px_0]">
              <img alt="" className="block max-w-none size-full" src={imgVector4} />
            </div>
          </div>
        </div>
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-center leading-[normal] not-italic relative shrink-0 text-center w-[504px]" data-node-id="3:4950">
          <p className="font-['Poppins:Medium'] relative shrink-0 text-[#130b1e] text-[32px] w-[522px]" data-node-id="3:4951">
            Preview your job post
          </p>
          <p className="font-['Poppins:Regular'] relative shrink-0 text-[#807a88] text-[14px] w-[548px]" data-node-id="3:4952">
            Everything look right? Your next great collaborator is one post away.
          </p>
        </div>
        <div className="content-stretch flex flex-col items-start min-h-[410px] overflow-clip relative shrink-0 w-full" data-node-id="3:4953" data-name="Form content">
          <div className="border border-[rgba(19,11,30,0.5)] border-solid content-stretch flex flex-col gap-[10px] items-start overflow-clip p-[16px] relative rounded-[16px] shrink-0 w-full" data-node-id="3:4954" data-name="Job post preview">
            <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="3:4955" data-name="Preview heading">
              <p className="[word-break:break-word] font-['Poppins:Regular'] leading-[normal] not-italic relative shrink-0 text-[#8a38f5] text-[11px] whitespace-nowrap" data-node-id="3:4956">
                JOB POST PREVIEW
              </p>
            </div>
            <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[1.4] not-italic relative shrink-0 text-[#130b1e] text-[20px] w-full" data-node-id="3:4957">
              Design a responsive website for a wellness brand
            </p>
            <div className="[word-break:break-word] content-stretch flex gap-[16px] items-start leading-[normal] not-italic overflow-clip relative shrink-0 w-full" data-node-id="3:4958" data-name="Job attributes">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[3px] items-start min-w-px overflow-clip relative" data-node-id="3:4959" data-name="Job detail">
                <p className="font-['Poppins:Regular'] relative shrink-0 text-[#767676] text-[11px] whitespace-nowrap" data-node-id="3:4960">
                  Category
                </p>
                <p className="font-['Poppins:Medium'] min-w-full relative shrink-0 text-[#130b1e] text-[13px] w-[min-content]" data-node-id="3:4961">
                  UI/UX Design
                </p>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[3px] items-start min-w-px overflow-clip relative" data-node-id="3:4962" data-name="Job detail">
                <p className="font-['Poppins:Regular'] relative shrink-0 text-[#767676] text-[11px] whitespace-nowrap" data-node-id="3:4963">
                  Job type
                </p>
                <p className="font-['Poppins:Medium'] min-w-full relative shrink-0 text-[#130b1e] text-[13px] w-[min-content]" data-node-id="3:4964">
                  Freelance project
                </p>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[3px] items-start min-w-px overflow-clip relative" data-node-id="3:4965" data-name="Job detail">
                <p className="font-['Poppins:Regular'] relative shrink-0 text-[#767676] text-[11px] whitespace-nowrap" data-node-id="3:4966">
                  Experience
                </p>
                <p className="font-['Poppins:Medium'] min-w-full relative shrink-0 text-[#130b1e] text-[13px] w-[min-content]" data-node-id="3:4967">
                  Intermediate
                </p>
              </div>
            </div>
            <div className="bg-[#d7d2dc] h-px relative shrink-0 w-full" data-node-id="3:4968" data-name="Divider" />
            <div className="[word-break:break-word] font-['Poppins:Regular'] leading-[0] not-italic relative shrink-0 text-[#130b1e] text-[12px] w-full whitespace-pre-wrap" data-node-id="3:4969">
              <p className="leading-[1.65] mb-0">We’re looking for a UI/UX designer to create a clean, welcoming website for Bloom, our wellness brand. Design the home, about and services pages for desktop and mobile in Figma.</p>
              <p className="leading-[1.65] mb-0">​</p>
              <p className="leading-[1.65]">Deliverables: 6 high-fidelity screens, a clickable prototype and a reusable component library. Please share 2 relevant portfolio projects. Brand assets are included in the reference brief.</p>
            </div>
            <div className="[word-break:break-word] bg-[#f9f6fd] content-stretch flex gap-[24px] items-start leading-[normal] not-italic overflow-clip p-[12px] relative rounded-[8px] shrink-0 w-full" data-node-id="3:4970" data-name="Budget and deadline">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[3px] items-start min-w-px overflow-clip relative" data-node-id="3:4971" data-name="Job detail">
                <p className="font-['Poppins:Regular'] relative shrink-0 text-[#767676] text-[11px] whitespace-nowrap" data-node-id="3:4972">
                  Project budget · USD
                </p>
                <p className="font-['Poppins:Medium'] min-w-full relative shrink-0 text-[#130b1e] text-[13px] w-[min-content]" data-node-id="3:4973">
                  $1,500 · Fixed price
                </p>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[3px] items-start min-w-px overflow-clip relative" data-node-id="3:4974" data-name="Job detail">
                <p className="font-['Poppins:Regular'] relative shrink-0 text-[#767676] text-[11px] whitespace-nowrap" data-node-id="3:4975">
                  Submission deadline
                </p>
                <p className="font-['Poppins:Medium'] min-w-full relative shrink-0 text-[#130b1e] text-[13px] w-[min-content]" data-node-id="3:4976">
                  November 6, 2026
                </p>
              </div>
            </div>
            <div className="bg-[#f9f6fd] border border-[#d7d2dc] border-solid content-stretch flex gap-[12px] h-[64px] items-center overflow-clip p-[14px] relative rounded-[12px] shrink-0 w-full" data-node-id="3:4977" data-name="Reference attachment">
              <div className="relative shrink-0 size-[25px]" data-node-id="3:4978" data-name="file-text">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFileText} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col font-['Poppins:Regular'] gap-[2px] items-start leading-[normal] min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="3:4980" data-name="File details">
                <p className="relative shrink-0 text-[#130b1e] text-[13px]" data-node-id="3:4981">
                  Website brief.pdf
                </p>
                <p className="relative shrink-0 text-[#767676] text-[11px]" data-node-id="3:4982">
                  PDF · 2.4 MB · Reference file
                </p>
              </div>
              <p className="[word-break:break-word] font-['Poppins:Regular'] leading-[normal] not-italic relative shrink-0 text-[#8a38f5] text-[12px] whitespace-nowrap" data-node-id="3:4983">
                View file
              </p>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0 w-full" data-node-id="3:4984">
          <div className="h-0 relative shrink-0 w-[760px]" data-node-id="3:4985">
            <div className="absolute inset-[-0.5px_0]">
              <img alt="" className="block max-w-none size-full" src={imgVector4} />
            </div>
          </div>
          <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-node-id="3:4986">
            <BackButton className="[word-break:break-word] content-stretch cursor-pointer flex font-['Poppins:Medium'] gap-[5px] h-[40px] items-center justify-center leading-[0] relative shrink-0 text-[#767676] text-left w-[100px] whitespace-nowrap" />
            <div className="content-stretch flex items-center relative shrink-0" data-node-id="3:4988">
              <button className="bg-[#8a38f5] content-stretch cursor-pointer flex gap-[4px] h-[40px] items-center justify-center p-[10px] relative rounded-[12px] shrink-0 w-[150px]" data-node-id="3:4989" data-name="Continue">
                <div className="[word-break:break-word] flex flex-col font-['Poppins:Medium'] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-left text-white whitespace-nowrap" data-node-id="I3:4989;183:552">
                  <p className="leading-[normal]">Post a Job</p>
                </div>
                <ButtonForward className="relative shrink-0 size-[24px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bg-white border-[0.5px] border-black border-solid h-[72px] left-[calc(50%+0.33px)] overflow-clip top-0 w-[1440px]" data-node-id="3:4990">
        <div className="-translate-y-1/2 absolute content-stretch flex items-center justify-between left-[32.5px] top-1/2 w-[1380px]" data-node-id="3:4991">
          <div className="content-stretch flex gap-[11px] items-center relative shrink-0" data-node-id="3:4992">
            <div className="bg-white border border-black border-solid overflow-clip relative rounded-[8px] shrink-0 size-[50px]" data-node-id="3:4993" data-name="Logo">
              <div className="absolute h-[33.151px] left-[2.5px] top-[8.5px] w-[44.874px]" data-node-id="3:4994">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup14} />
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[18px] text-black whitespace-nowrap" data-node-id="3:4998">
              FindRight
            </p>
          </div>
          <div className="content-stretch flex gap-[19px] items-center relative shrink-0" data-node-id="3:4999">
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-node-id="3:5000">
              <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap" data-node-id="3:5001">
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