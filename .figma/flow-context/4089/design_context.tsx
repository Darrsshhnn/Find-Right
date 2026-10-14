const assetPathPrefix = "./assets";
const imgRectangle13 = "https://www.figma.com/api/mcp/asset/256682da-c287-470f-ae98-e6d2a74d02a8/74ddf.png";
const imgEllipse2 = `${assetPathPrefix}/881bf.svg`;
const imgVector5 = `${assetPathPrefix}/e5d86.png`;
const imgVector6 = `${assetPathPrefix}/693dd.png`;
const imgEllipse20 = `${assetPathPrefix}/b03fc.png`;
const imgEllipse21 = `${assetPathPrefix}/c0470.png`;
const imgRectangle14 = `${assetPathPrefix}/11654.png`;
const imgRectangle15 = `${assetPathPrefix}/1f943.png`;
const imgVector4 = `${assetPathPrefix}/2bb2c.svg`;
const imgVector7 = `${assetPathPrefix}/dd536.svg`;
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

type SkillsMiniProps = {
  className?: string;
  property1?: "Frame 34";
};

function SkillsMini({ className, property1 = "Frame 34" }: SkillsMiniProps) {
  return (
    <button className={className || "bg-[#fefbfc] border border-[#767676] border-solid content-stretch flex h-[26px] items-center justify-center overflow-clip px-[15px] relative rounded-[8px]"} data-node-id="3:796">
      <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-left whitespace-nowrap" data-node-id="3:797">
        Logo Design
      </p>
    </button>
  );
}

type SelectionCardProps = {
  className?: string;
  property1?: "Default";
};

function SelectionCard({ className, property1 = "Default" }: SelectionCardProps) {
  return (
    <button className={className || "bg-white block border-[0.5px] border-black border-solid overflow-clip relative rounded-[12px] size-[253px]"} data-node-id="3:801">
      <div className="absolute h-[153px] left-[-0.5px] rounded-tl-[12px] rounded-tr-[12px] top-[-0.5px] w-[253px]" data-node-id="3:802">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-tl-[12px] rounded-tr-[12px] size-full" src={imgRectangle13} />
      </div>
      <p className="[word-break:break-word] absolute font-['Poppins:Regular'] leading-[17.007px] left-[9.5px] not-italic text-[#6f6a78] text-[12px] text-left top-[160.5px] w-[233px]" data-node-id="3:803">
        Visual identity systems, logos, guidelines, and typography.
      </p>
      <div className="absolute content-stretch flex gap-[3px] items-center left-[9.5px] top-[211.5px]" data-node-id="3:804">
        <SkillsMini className="bg-[#fefbfc] border border-[#767676] border-solid content-stretch flex h-[26px] items-center justify-center overflow-clip px-[15px] relative rounded-[8px] shrink-0" />
        <div className="bg-[#fefbfc] border border-[#767676] border-solid content-stretch flex h-[26px] items-center justify-center overflow-clip px-[15px] relative rounded-[8px] shrink-0" data-node-id="3:806" role="button" tabIndex="0" data-name="Skills Mini">
          <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-left whitespace-nowrap" data-node-id="I3:806;260:246">
            Brand Identity
          </p>
        </div>
      </div>
      <div className="absolute bg-[rgba(0,0,0,0.6)] h-[153px] left-[-0.5px] rounded-tl-[12px] rounded-tr-[12px] top-[-0.5px] w-[253px]" data-node-id="3:807" />
      <p className="[word-break:break-word] absolute font-['Poppins:Bold'] leading-[1.25] left-[10.5px] not-italic text-[18px] text-left text-white top-[117.5px] w-[209px]" data-node-id="3:808">{`Brand identity & logos`}</p>
      <div className="absolute left-[203.5px] size-[32px] top-[19.5px]" data-node-id="3:809">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse2} />
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

export default function Filter() {
  return (
    <div className="bg-[#fefbfc] relative size-full" data-node-id="3:4089" data-name="Filter">
      <BgAnimation className="-translate-x-1/2 absolute bottom-[-0.08px] h-[839.076px] left-[calc(50%+0.23px)] w-[1515.797px]" />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-white border border-[rgba(0,0,0,0.3)] border-solid content-stretch flex flex-col gap-[25px] h-[740px] items-center justify-center left-[calc(50%+0.33px)] overflow-clip px-[80px] rounded-[28px] top-[calc(50%+32.5px)] w-[920px]" data-node-id="3:4091">
        <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-[798px]" data-node-id="3:4092">
          <div className="[word-break:break-word] content-stretch flex font-['Poppins:Medium'] items-center justify-between leading-[normal] not-italic relative shrink-0 text-[16px] w-full whitespace-nowrap" data-node-id="3:4093">
            <p className="relative shrink-0 text-[#767676]" data-node-id="3:4094">
              Step 3/3 : Creative disciplines
            </p>
            <p className="relative shrink-0 text-[#8a38f5]" data-node-id="3:4095">
              Hirer preferences
            </p>
          </div>
          <div className="h-0 relative shrink-0 w-[760px]" data-node-id="3:4096">
            <div className="absolute inset-[-0.5px_0]">
              <img alt="" className="block max-w-none size-full" src={imgVector4} />
            </div>
          </div>
        </div>
        <div className="[word-break:break-word] content-stretch flex flex-col font-['Poppins:Medium'] gap-[4px] items-center leading-[normal] not-italic relative shrink-0 text-center w-[674px]" data-node-id="3:4097">
          <p className="relative shrink-0 text-[32px] text-black w-[600px]" data-node-id="3:4098">
            Pick one or more topics
          </p>
          <p className="relative shrink-0 text-[16px] text-[rgba(19,11,30,0.5)] whitespace-nowrap" data-node-id="3:4099">
            Choose the creative disciplines you actively design and accept client projects in.
          </p>
        </div>
        <div className="bg-white border border-solid border-white content-stretch cursor-pointer flex flex-col gap-[40px] h-[411px] items-start overflow-x-clip overflow-y-auto p-[10px] relative shrink-0" data-node-id="3:4100">
          <div className="content-stretch flex gap-[20px] items-center relative shrink-0" data-node-id="3:4101">
            <SelectionCard className="bg-white block border-[0.5px] border-black border-solid overflow-clip relative rounded-[12px] shrink-0 size-[253px]" />
            <button className="bg-white block border-[0.5px] border-black border-solid overflow-clip relative rounded-[12px] shrink-0 size-[253px]" data-node-id="3:4103" data-name="Selection Card">
              <div className="absolute h-[153px] left-[-0.5px] rounded-tl-[12px] rounded-tr-[12px] top-[-0.5px] w-[253px]" data-node-id="I3:4103;248:1486">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-tl-[12px] rounded-tr-[12px] size-full" src={imgRectangle14} />
              </div>
              <p className="[word-break:break-word] absolute font-['Poppins:Regular'] leading-[17.007px] left-[9.5px] not-italic text-[#6f6a78] text-[12px] text-left top-[160.5px] w-[233px]" data-node-id="I3:4103;248:1487">
                Custom character art, editorial art, product spots, and icons.
              </p>
              <div className="absolute content-stretch flex gap-[3px] items-center left-[9.5px] top-[211.5px]" data-node-id="I3:4103;248:1871">
                <SkillsMini className="bg-[#fefbfc] border border-[#767676] border-solid content-stretch flex h-[26px] items-center justify-center overflow-clip px-[15px] relative rounded-[8px] shrink-0" />
                <div className="bg-[#fefbfc] border border-[#767676] border-solid content-stretch flex h-[26px] items-center justify-center overflow-clip px-[15px] relative rounded-[8px] shrink-0" data-node-id="I3:4103;260:300" role="button" tabIndex="0" data-name="Skills Mini">
                  <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-left whitespace-nowrap" data-node-id="I3:4103;260:300;260:246">
                    Brand Identity
                  </p>
                </div>
              </div>
              <div className="absolute bg-[rgba(0,0,0,0.6)] h-[153px] left-[-0.5px] rounded-tl-[12px] rounded-tr-[12px] top-[-0.5px] w-[253px]" data-node-id="I3:4103;248:1490" />
              <p className="[word-break:break-word] absolute font-['Poppins:Bold'] leading-[1.25] left-[10.5px] not-italic text-[18px] text-left text-white top-[117.5px] w-[209px]" data-node-id="I3:4103;248:1491">
                Video Editing
              </p>
              <div className="absolute left-[203.5px] size-[32px] top-[19.5px]" data-node-id="I3:4103;248:1492">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse2} />
              </div>
            </button>
            <button className="bg-white block border-[0.5px] border-black border-solid overflow-clip relative rounded-[12px] shrink-0 size-[253px]" data-node-id="3:4104" data-name="Selection Card">
              <div className="absolute h-[153px] left-[-0.5px] rounded-tl-[12px] rounded-tr-[12px] top-[-0.5px] w-[253px]" data-node-id="I3:4104;248:1486">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-tl-[12px] rounded-tr-[12px] size-full" src={imgRectangle15} />
              </div>
              <p className="[word-break:break-word] absolute font-['Poppins:Regular'] leading-[17.007px] left-[9.5px] not-italic text-[#6f6a78] text-[12px] text-left top-[160.5px] w-[233px]" data-node-id="I3:4104;248:1487">
                Mobile apps, SaaS interfaces, websites, and design systems.
              </p>
              <div className="absolute content-stretch flex gap-[3px] items-center left-[9.5px] top-[211.5px]" data-node-id="I3:4104;248:1871">
                <SkillsMini className="bg-[#fefbfc] border border-[#767676] border-solid content-stretch flex h-[26px] items-center justify-center overflow-clip px-[15px] relative rounded-[8px] shrink-0" />
                <div className="bg-[#fefbfc] border border-[#767676] border-solid content-stretch flex h-[26px] items-center justify-center overflow-clip px-[15px] relative rounded-[8px] shrink-0" data-node-id="I3:4104;260:300" role="button" tabIndex="0" data-name="Skills Mini">
                  <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-left whitespace-nowrap" data-node-id="I3:4104;260:300;260:246">
                    Brand Identity
                  </p>
                </div>
              </div>
              <div className="absolute bg-[rgba(0,0,0,0.6)] h-[153px] left-[-0.5px] rounded-tl-[12px] rounded-tr-[12px] top-[-0.5px] w-[253px]" data-node-id="I3:4104;248:1490" />
              <p className="[word-break:break-word] absolute font-['Poppins:Bold'] leading-[1.25] left-[10.5px] not-italic text-[18px] text-left text-white top-[117.5px] w-[209px]" data-node-id="I3:4104;248:1491">
                UI/UX Desing
              </p>
              <div className="absolute left-[203.5px] size-[32px] top-[19.5px]" data-node-id="I3:4104;248:1492">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse2} />
              </div>
            </button>
          </div>
          <div className="content-stretch flex gap-[20px] items-center relative shrink-0" data-node-id="3:4105">
            <button className="bg-white block border-[0.5px] border-black border-solid overflow-clip relative rounded-[12px] shrink-0 size-[253px]" data-node-id="3:4106" data-name="Selection Card">
              <div className="absolute h-[153px] left-[-0.5px] rounded-tl-[12px] rounded-tr-[12px] top-[-0.5px] w-[253px]" data-node-id="I3:4106;248:1486">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-tl-[12px] rounded-tr-[12px] size-full" src={imgRectangle13} />
              </div>
              <p className="[word-break:break-word] absolute font-['Poppins:Regular'] leading-[17.007px] left-[9.5px] not-italic text-[#6f6a78] text-[12px] text-left top-[160.5px] w-[233px]" data-node-id="I3:4106;248:1487">
                Visual identity systems, logos, guidelines, and typography.
              </p>
              <div className="absolute content-stretch flex gap-[3px] items-center left-[9.5px] top-[211.5px]" data-node-id="I3:4106;248:1871">
                <SkillsMini className="bg-[#fefbfc] border border-[#767676] border-solid content-stretch flex h-[26px] items-center justify-center overflow-clip px-[15px] relative rounded-[8px] shrink-0" />
                <div className="bg-[#fefbfc] border border-[#767676] border-solid content-stretch flex h-[26px] items-center justify-center overflow-clip px-[15px] relative rounded-[8px] shrink-0" data-node-id="I3:4106;260:300" role="button" tabIndex="0" data-name="Skills Mini">
                  <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-left whitespace-nowrap" data-node-id="I3:4106;260:300;260:246">
                    Brand Identity
                  </p>
                </div>
              </div>
              <div className="absolute bg-[rgba(0,0,0,0.6)] h-[153px] left-[-0.5px] rounded-tl-[12px] rounded-tr-[12px] top-[-0.5px] w-[253px]" data-node-id="I3:4106;248:1490" />
              <p className="[word-break:break-word] absolute font-['Poppins:Bold'] leading-[1.25] left-[10.5px] not-italic text-[18px] text-left text-white top-[117.5px] w-[209px]" data-node-id="I3:4106;248:1491">{`Packaging & Merch`}</p>
              <div className="absolute left-[203.5px] size-[32px] top-[19.5px]" data-node-id="I3:4106;248:1492">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse2} />
              </div>
            </button>
            <button className="bg-white block border-[0.5px] border-black border-solid overflow-clip relative rounded-[12px] shrink-0 size-[253px]" data-node-id="3:4107" data-name="Selection Card">
              <div className="absolute h-[153px] left-[-0.5px] rounded-tl-[12px] rounded-tr-[12px] top-[-0.5px] w-[253px]" data-node-id="I3:4107;248:1486">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-tl-[12px] rounded-tr-[12px] size-full" src={imgRectangle14} />
              </div>
              <p className="[word-break:break-word] absolute font-['Poppins:Regular'] leading-[17.007px] left-[9.5px] not-italic text-[#6f6a78] text-[12px] text-left top-[160.5px] w-[233px]" data-node-id="I3:4107;248:1487">
                Custom character art, editorial art, product spots, and icons.
              </p>
              <div className="absolute content-stretch flex gap-[3px] items-center left-[9.5px] top-[211.5px]" data-node-id="I3:4107;248:1871">
                <SkillsMini className="bg-[#fefbfc] border border-[#767676] border-solid content-stretch flex h-[26px] items-center justify-center overflow-clip px-[15px] relative rounded-[8px] shrink-0" />
                <div className="bg-[#fefbfc] border border-[#767676] border-solid content-stretch flex h-[26px] items-center justify-center overflow-clip px-[15px] relative rounded-[8px] shrink-0" data-node-id="I3:4107;260:300" role="button" tabIndex="0" data-name="Skills Mini">
                  <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-left whitespace-nowrap" data-node-id="I3:4107;260:300;260:246">
                    Brand Identity
                  </p>
                </div>
              </div>
              <div className="absolute bg-[rgba(0,0,0,0.6)] h-[153px] left-[-0.5px] rounded-tl-[12px] rounded-tr-[12px] top-[-0.5px] w-[253px]" data-node-id="I3:4107;248:1490" />
              <p className="[word-break:break-word] absolute font-['Poppins:Bold'] leading-[1.25] left-[10.5px] not-italic text-[18px] text-left text-white top-[117.5px] w-[209px]" data-node-id="I3:4107;248:1491">
                Illustrations
              </p>
              <div className="absolute left-[203.5px] size-[32px] top-[19.5px]" data-node-id="I3:4107;248:1492">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse2} />
              </div>
            </button>
            <button className="bg-white block border-[0.5px] border-black border-solid overflow-clip relative rounded-[12px] shrink-0 size-[253px]" data-node-id="3:4108" data-name="Selection Card">
              <div className="absolute h-[153px] left-[-0.5px] rounded-tl-[12px] rounded-tr-[12px] top-[-0.5px] w-[253px]" data-node-id="I3:4108;248:1486">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-tl-[12px] rounded-tr-[12px] size-full" src={imgRectangle15} />
              </div>
              <p className="[word-break:break-word] absolute font-['Poppins:Regular'] leading-[17.007px] left-[9.5px] not-italic text-[#6f6a78] text-[12px] text-left top-[160.5px] w-[233px]" data-node-id="I3:4108;248:1487">
                Mobile apps, SaaS interfaces, websites, and design systems.
              </p>
              <div className="absolute content-stretch flex gap-[3px] items-center left-[9.5px] top-[211.5px]" data-node-id="I3:4108;248:1871">
                <SkillsMini className="bg-[#fefbfc] border border-[#767676] border-solid content-stretch flex h-[26px] items-center justify-center overflow-clip px-[15px] relative rounded-[8px] shrink-0" />
                <div className="bg-[#fefbfc] border border-[#767676] border-solid content-stretch flex h-[26px] items-center justify-center overflow-clip px-[15px] relative rounded-[8px] shrink-0" data-node-id="I3:4108;260:300" role="button" tabIndex="0" data-name="Skills Mini">
                  <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-left whitespace-nowrap" data-node-id="I3:4108;260:300;260:246">
                    Brand Identity
                  </p>
                </div>
              </div>
              <div className="absolute bg-[rgba(0,0,0,0.6)] h-[153px] left-[-0.5px] rounded-tl-[12px] rounded-tr-[12px] top-[-0.5px] w-[253px]" data-node-id="I3:4108;248:1490" />
              <p className="[word-break:break-word] absolute font-['Poppins:Bold'] leading-[1.25] left-[10.5px] not-italic text-[18px] text-left text-white top-[117.5px] w-[209px]" data-node-id="I3:4108;248:1491">
                Motion Design
              </p>
              <div className="absolute left-[203.5px] size-[32px] top-[19.5px]" data-node-id="I3:4108;248:1492">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse2} />
              </div>
            </button>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0 w-[798px]" data-node-id="3:4109">
          <div className="h-0 relative shrink-0 w-[798px]" data-node-id="3:4110">
            <div className="absolute inset-[-0.5px_0]">
              <img alt="" className="block max-w-none size-full" src={imgVector7} />
            </div>
          </div>
          <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-node-id="3:4111">
            <BackButton className="[word-break:break-word] content-stretch cursor-pointer flex font-['Poppins:Medium'] gap-[5px] h-[40px] items-center justify-center leading-[0] relative shrink-0 text-[#767676] text-left w-[100px] whitespace-nowrap" />
            <div className="content-stretch flex gap-[10px] items-center relative shrink-0" data-node-id="3:4113">
              <button className="border border-[#767676] border-solid content-stretch cursor-pointer flex h-[40px] items-center justify-center relative rounded-[12px] shrink-0 w-[88px]" data-node-id="3:4114" data-name="Skip to Dashboard">
                <div className="[word-break:break-word] flex flex-col font-['Poppins:Medium'] justify-center leading-[0] not-italic relative shrink-0 text-[#767676] text-[16px] text-left whitespace-nowrap" data-node-id="I3:4114;183:550">
                  <p className="leading-[normal]">Skip</p>
                </div>
              </button>
              <div className="bg-[#8a38f5] content-stretch flex h-[40px] items-center justify-center px-[30px] py-[10px] relative rounded-[12px] shrink-0" data-node-id="3:4115">
                <div className="[word-break:break-word] flex flex-col font-['Poppins:Medium'] justify-center leading-[0] not-italic relative shrink-0 text-[#fefbfc] text-[16px] whitespace-nowrap" data-node-id="I3:4115;252:4723">
                  <p className="leading-[normal]">Go to Dashboard</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bg-white border-[0.5px] border-black border-solid h-[72px] left-[calc(50%+0.33px)] overflow-clip top-0 w-[1440px]" data-node-id="3:4116">
        <div className="-translate-y-1/2 absolute content-stretch flex items-center justify-between left-[32.5px] top-1/2 w-[1380px]" data-node-id="3:4117">
          <div className="content-stretch flex gap-[11px] items-center relative shrink-0" data-node-id="3:4118">
            <div className="bg-white border border-black border-solid overflow-clip relative rounded-[8px] shrink-0 size-[50px]" data-node-id="3:4119" data-name="Logo">
              <div className="absolute h-[33.151px] left-[2.5px] top-[8.5px] w-[44.874px]" data-node-id="3:4120">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup14} />
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[18px] text-black whitespace-nowrap" data-node-id="3:4124">
              FindRight
            </p>
          </div>
          <div className="content-stretch flex gap-[19px] items-center relative shrink-0" data-node-id="3:4125">
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-node-id="3:4126">
              <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap" data-node-id="3:4127">
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