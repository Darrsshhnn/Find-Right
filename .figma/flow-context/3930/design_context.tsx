const assetPathPrefix = "./assets";
const imgButtonForward = `${assetPathPrefix}/e3424.svg`;
const imgVector5 = `${assetPathPrefix}/e5d86.png`;
const imgVector6 = `${assetPathPrefix}/693dd.png`;
const imgEllipse20 = `${assetPathPrefix}/b03fc.png`;
const imgEllipse21 = `${assetPathPrefix}/c0470.png`;
const imgVector4 = `${assetPathPrefix}/2bb2c.svg`;
const imgCheck = `${assetPathPrefix}/78790.svg`;
const imgDivider = `${assetPathPrefix}/27172.svg`;
const imgCheck1 = `${assetPathPrefix}/d4fc7.svg`;
const imgCheck2 = `${assetPathPrefix}/e57ea.svg`;
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

export default function Offer() {
  return (
    <div className="bg-[#fefbfc] relative size-full" data-node-id="3:3930" data-name="Offer">
      <BgAnimation className="-translate-x-1/2 absolute bottom-[-0.08px] h-[839.076px] left-[calc(50%+0.23px)] w-[1515.797px]" />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-white border border-[rgba(0,0,0,0.3)] border-solid content-stretch flex flex-col gap-[25px] h-[533px] items-center justify-center left-[calc(50%+0.33px)] overflow-clip px-[80px] rounded-[28px] top-[calc(50%+1px)] w-[920px]" data-node-id="3:3932">
        <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-node-id="3:3933">
          <div className="[word-break:break-word] content-stretch flex font-['Poppins:Medium'] items-center justify-between leading-[normal] not-italic relative shrink-0 text-[16px] w-full whitespace-nowrap" data-node-id="3:3934">
            <p className="relative shrink-0 text-[#767676]" data-node-id="3:3935">
              Step 3/4 : Starter talent reward
            </p>
            <p className="relative shrink-0 text-[#8a38f5]" data-node-id="3:3936">
              FindRight hiring incentives
            </p>
          </div>
          <div className="h-0 relative shrink-0 w-[760px]" data-node-id="3:3937">
            <div className="absolute inset-[-0.5px_0]">
              <img alt="" className="block max-w-none size-full" src={imgVector4} />
            </div>
          </div>
        </div>
        <div className="[word-break:break-word] content-stretch flex flex-col font-['Poppins:Medium'] gap-[4px] items-center leading-[normal] not-italic relative shrink-0 text-center w-[596px]" data-node-id="3:3938">
          <p className="relative shrink-0 text-[32px] text-black w-[600px]" data-node-id="3:3939">
            Your starter hire credits are unlocked
          </p>
          <p className="min-w-full relative shrink-0 text-[16px] text-[rgba(19,11,30,0.5)] w-[min-content]" data-node-id="3:3940">
            Try new talent with less risk. Give rising talent a chance.
          </p>
        </div>
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="3:3941">
          <div className="bg-white border-2 border-[#8a38f5] border-solid col-1 content-stretch flex flex-col gap-[16.911px] h-[196.427px] items-start ml-0 mt-0 overflow-clip p-[20.293px] relative rounded-[20px] row-1 w-[236.444px]" data-node-id="3:3942" data-name="Credit Card">
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="3:3943" data-name="Header Row">
              <div className="bg-[#f3eaff] content-stretch flex items-start px-[8.456px] py-[3.382px] relative rounded-[5.073px] shrink-0" data-node-id="3:3944" data-name="Credit Badge">
                <p className="[word-break:break-word] font-['Poppins:Bold'] leading-[normal] not-italic relative shrink-0 text-[#8324ff] text-[9.301px] tracking-[0.4228px] whitespace-nowrap" data-node-id="3:3945">
                  CREDIT 1
                </p>
              </div>
              <div className="content-stretch flex gap-[3.382px] items-center relative shrink-0" data-node-id="3:3946" data-name="Status">
                <div className="content-stretch flex flex-col h-[11.853px] items-center justify-center overflow-clip relative shrink-0 w-[11.822px]" data-node-id="3:3947" data-name="Check Icon">
                  <div className="h-[11.853px] relative shrink-0 w-[11.822px]" data-node-id="3:3948" data-name="check">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCheck} />
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Poppins:SemiBold'] leading-[normal] not-italic relative shrink-0 text-[#10b981] text-[10.992px] whitespace-nowrap" data-node-id="3:3950">
                  Available
                </p>
              </div>
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[5.073px] items-start not-italic relative shrink-0 w-full" data-node-id="3:3951" data-name="Card Body">
              <p className="font-['Poppins:Bold'] leading-[normal] relative shrink-0 text-[#130b1e] text-[27.058px] w-full" data-node-id="3:3952">
                15% OFF
              </p>
              <p className="font-['Poppins:Medium'] leading-[1.4] relative shrink-0 text-[#767676] text-[11.838px] w-full" data-node-id="3:3953">
                Up to $500 on rising talent
              </p>
            </div>
            <div className="h-0 relative shrink-0 w-full" data-node-id="3:3954" data-name="Divider">
              <div className="absolute inset-[-0.85px_0_0_0]">
                <img alt="" className="block max-w-none size-full" src={imgDivider} />
              </div>
            </div>
            <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] not-italic relative shrink-0 text-[#767676] text-[10.992px] w-full" data-node-id="3:3955">
              Valid for your 1st hire
            </p>
          </div>
          <div className="bg-white border-2 border-[#8a38f5] border-solid col-1 content-stretch flex flex-col gap-[16.911px] h-[196.427px] items-start ml-[261.78px] mt-0 overflow-clip p-[20.293px] relative rounded-[20px] row-1 w-[236.444px]" data-node-id="3:3956" data-name="Credit Card 2">
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="3:3957" data-name="Header Row">
              <div className="bg-[#f3eaff] content-stretch flex items-start px-[8.456px] py-[3.382px] relative rounded-[5.073px] shrink-0" data-node-id="3:3958" data-name="Credit Badge">
                <p className="[word-break:break-word] font-['Poppins:Bold'] leading-[normal] not-italic relative shrink-0 text-[#8324ff] text-[9.301px] tracking-[0.4228px] whitespace-nowrap" data-node-id="3:3959">
                  CREDIT 1
                </p>
              </div>
              <div className="content-stretch flex gap-[3.382px] items-center relative shrink-0" data-node-id="3:3960" data-name="Status">
                <div className="content-stretch flex flex-col h-[11.853px] items-center justify-center overflow-clip relative shrink-0 w-[11.822px]" data-node-id="3:3961" data-name="Check Icon">
                  <div className="h-[11.853px] relative shrink-0 w-[11.822px]" data-node-id="3:3962" data-name="check">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCheck1} />
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Poppins:SemiBold'] leading-[normal] not-italic relative shrink-0 text-[#10b981] text-[10.992px] whitespace-nowrap" data-node-id="3:3964">
                  Available
                </p>
              </div>
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[5.073px] items-start not-italic relative shrink-0 w-full" data-node-id="3:3965" data-name="Card Body">
              <p className="font-['Poppins:Bold'] leading-[normal] relative shrink-0 text-[#130b1e] text-[27.058px] w-full" data-node-id="3:3966">
                15% OFF
              </p>
              <p className="font-['Poppins:Medium'] leading-[1.4] relative shrink-0 text-[#767676] text-[11.838px] w-full" data-node-id="3:3967">
                Up to $500 on rising talent
              </p>
            </div>
            <div className="h-0 relative shrink-0 w-full" data-node-id="3:3968" data-name="Divider">
              <div className="absolute inset-[-0.85px_0_0_0]">
                <img alt="" className="block max-w-none size-full" src={imgDivider} />
              </div>
            </div>
            <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] not-italic relative shrink-0 text-[#767676] text-[10.992px] w-full" data-node-id="3:3969">
              Valid for your 1st hire
            </p>
          </div>
          <div className="bg-white border-2 border-[#8a38f5] border-solid col-1 content-stretch flex flex-col gap-[16.911px] h-[196.427px] items-start ml-[523.56px] mt-0 overflow-clip p-[20.293px] relative rounded-[20px] row-1 w-[236.444px]" data-node-id="3:3970" data-name="Credit Card 3">
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="3:3971" data-name="Header Row">
              <div className="bg-[#f3eaff] content-stretch flex items-start px-[8.456px] py-[3.382px] relative rounded-[5.073px] shrink-0" data-node-id="3:3972" data-name="Credit Badge">
                <p className="[word-break:break-word] font-['Poppins:Bold'] leading-[normal] not-italic relative shrink-0 text-[#8324ff] text-[9.301px] tracking-[0.4228px] whitespace-nowrap" data-node-id="3:3973">
                  CREDIT 1
                </p>
              </div>
              <div className="content-stretch flex gap-[3.382px] items-center relative shrink-0" data-node-id="3:3974" data-name="Status">
                <div className="content-stretch flex flex-col h-[11.853px] items-center justify-center overflow-clip relative shrink-0 w-[11.822px]" data-node-id="3:3975" data-name="Check Icon">
                  <div className="h-[11.853px] relative shrink-0 w-[11.822px]" data-node-id="3:3976" data-name="check">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCheck2} />
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Poppins:SemiBold'] leading-[normal] not-italic relative shrink-0 text-[#10b981] text-[10.992px] whitespace-nowrap" data-node-id="3:3978">
                  Available
                </p>
              </div>
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[5.073px] items-start not-italic relative shrink-0 w-full" data-node-id="3:3979" data-name="Card Body">
              <p className="font-['Poppins:Bold'] leading-[normal] relative shrink-0 text-[#130b1e] text-[27.058px] w-full" data-node-id="3:3980">
                15% OFF
              </p>
              <p className="font-['Poppins:Medium'] leading-[1.4] relative shrink-0 text-[#767676] text-[11.838px] w-full" data-node-id="3:3981">
                Up to $500 on rising talent
              </p>
            </div>
            <div className="h-0 relative shrink-0 w-full" data-node-id="3:3982" data-name="Divider">
              <div className="absolute inset-[-0.85px_0_0_0]">
                <img alt="" className="block max-w-none size-full" src={imgDivider} />
              </div>
            </div>
            <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] not-italic relative shrink-0 text-[#767676] text-[10.992px] w-full" data-node-id="3:3983">
              Valid for your 1st hire
            </p>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0 w-full" data-node-id="3:3984">
          <div className="h-0 relative shrink-0 w-[760px]" data-node-id="3:3985">
            <div className="absolute inset-[-0.5px_0]">
              <img alt="" className="block max-w-none size-full" src={imgVector4} />
            </div>
          </div>
          <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-node-id="3:3986">
            <BackButton className="[word-break:break-word] content-stretch cursor-pointer flex font-['Poppins:Medium'] gap-[5px] h-[40px] items-center justify-center leading-[0] relative shrink-0 text-[#767676] text-left w-[100px] whitespace-nowrap" />
            <div className="content-stretch flex items-center relative shrink-0" data-node-id="3:3988">
              <a className="bg-[#8a38f5] content-stretch cursor-pointer flex gap-[4px] h-[40px] items-center justify-center p-[10px] relative rounded-[12px] shrink-0 w-[150px]" data-node-id="3:3989" data-name="Continue">
                <div className="[word-break:break-word] flex flex-col font-['Poppins:Medium'] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-left text-white whitespace-nowrap" data-node-id="I3:3989;183:552">
                  <p className="leading-[normal]">Continue</p>
                </div>
                <ButtonForward className="relative shrink-0 size-[24px]" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bg-white border-[0.5px] border-black border-solid h-[72px] left-[calc(50%+0.33px)] overflow-clip top-0 w-[1440px]" data-node-id="3:3990">
        <div className="-translate-y-1/2 absolute content-stretch flex items-center justify-between left-[32.5px] top-1/2 w-[1380px]" data-node-id="3:3991">
          <div className="content-stretch flex gap-[11px] items-center relative shrink-0" data-node-id="3:3992">
            <div className="bg-white border border-black border-solid overflow-clip relative rounded-[8px] shrink-0 size-[50px]" data-node-id="3:3993" data-name="Logo">
              <div className="absolute h-[33.151px] left-[2.5px] top-[8.5px] w-[44.874px]" data-node-id="3:3994">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup14} />
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[18px] text-black whitespace-nowrap" data-node-id="3:3998">
              FindRight
            </p>
          </div>
          <div className="content-stretch flex gap-[19px] items-center relative shrink-0" data-node-id="3:3999">
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-node-id="3:4000">
              <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap" data-node-id="3:4001">
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