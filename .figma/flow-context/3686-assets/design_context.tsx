const assetPathPrefix = "./assets";
const imgEllipse = `${assetPathPrefix}/f7f5d.svg`;
const imgShadow = `${assetPathPrefix}/8816d.svg`;
const imgGroup14 = `${assetPathPrefix}/e88ce.svg`;

function Point({ className }: { className?: string }) {
  return (
    <div className={className || "bg-[#fefbfc] border border-[#8a38f5] border-solid content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative rounded-[20px]"} data-node-id="3:32" data-name="Point">
      <div className="relative shrink-0 size-[6px]" data-node-id="3:33" data-name="Ellipse">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse} />
      </div>
      <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[0] not-italic relative shrink-0 text-[#130b1e] text-[13px] whitespace-nowrap" data-node-id="3:34">
        <span className="font-['Poppins:SemiBold'] leading-[normal]">{`FindRight `}</span>
        <span className="font-['Poppins:SemiBold'] leading-[normal] text-[#645d75]">• Transparent Freelancer find and hire platform</span>
      </p>
    </div>
  );
}

export default function WelcomeScreen() {
  return (
    <div className="bg-[#fefbfc] relative size-full" data-node-id="3:3686" data-name="Welcome Screen">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+0.33px)] size-[600px] top-[calc(50%-0.5px)]" data-node-id="3:3687" data-name="shadow">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgShadow} />
      </div>
      <div className="absolute bg-[#fefbfc] border-[#130b1e] border-[0.5px] border-solid h-[72px] left-0 overflow-clip top-0 w-[1440px]" data-node-id="3:3688" data-name="navbar">
        <div className="-translate-y-1/2 absolute content-stretch flex items-center justify-between left-[32.5px] top-1/2 w-[1380px]" data-node-id="3:3689">
          <div className="content-stretch flex gap-[11px] items-center relative shrink-0" data-node-id="3:3690">
            <div className="bg-[#fefbfc] border border-[#130b1e] border-solid overflow-clip relative rounded-[8px] shrink-0 size-[50px]" data-node-id="3:3691" data-name="Logo">
              <div className="absolute h-[33.151px] left-[2.5px] top-[8.5px] w-[44.874px]" data-node-id="3:3692">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup14} />
              </div>
            </div>
            <p className="[word-break:break-word] font-['Poppins:Bold'] leading-[normal] not-italic relative shrink-0 text-[#130b1e] text-[18px] whitespace-nowrap" data-node-id="3:3696">
              FindRight
            </p>
          </div>
          <div className="content-stretch flex gap-[19px] items-center relative shrink-0" data-node-id="3:3697">
            <div className="content-stretch flex items-center justify-center p-[10px] relative shrink-0" data-node-id="3:3698" data-name="Sign in">
              <p className="[word-break:break-word] font-['Poppins:SemiBold'] leading-[normal] not-italic relative shrink-0 text-[#130b1e] text-[16px] whitespace-nowrap" data-node-id="I3:3698;161:2593">
                Sign in
              </p>
            </div>
            <div className="bg-[#8a38f5] content-stretch flex h-[37px] items-center justify-center px-[30px] py-[10px] relative rounded-[8px] shrink-0 w-[110px]" data-node-id="3:3699" data-name="Get started">
              <p className="[word-break:break-word] font-['Poppins:SemiBold'] leading-[1.6] not-italic relative shrink-0 text-[#fefbfc] text-[14px] text-center whitespace-nowrap" data-node-id="I3:3699;150:326">
                Get started
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col gap-[44px] items-center left-[calc(50%+0.33px)] top-1/2 w-[878px]" data-node-id="3:3700">
        <Point className="bg-[#fefbfc] border border-[#8a38f5] border-solid content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative rounded-[20px] shrink-0" />
        <div className="[word-break:break-word] font-['Poppins:ExtraBold'] h-[168px] leading-[1.15] not-italic relative shrink-0 text-[64px] text-center w-full whitespace-nowrap" data-node-id="3:3702" data-name="heading">
          <p className="-translate-x-1/2 absolute left-[calc(50%-16px)] text-[#8a38f5] top-[94px]" data-node-id="3:3703">
            Real portfolios.
          </p>
          <p className="-translate-x-1/2 absolute left-1/2 text-[#130b1e] top-0" data-node-id="3:3704">
            Real designers. Real work.
          </p>
        </div>
        <div className="h-[58px] relative shrink-0 w-[679px]" data-node-id="3:3705" data-name="body text">
          <div className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[0] left-1/2 not-italic text-[#645d75] text-[18px] text-center top-0 whitespace-nowrap" data-node-id="3:3706">
            <p className="leading-[1.6] mb-0 whitespace-pre">{`The human, brand-aware alternative to generic AI imagery. Designers disclose `}</p>
            <p className="leading-[1.6] whitespace-pre">{`their AI usage upfront, so you always know what you're paying for.`}</p>
          </div>
        </div>
        <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-node-id="3:3707" data-name="both button">
          <a className="bg-[#8a38f5] content-stretch cursor-pointer flex h-[37px] items-center justify-center px-[16px] py-[10px] relative rounded-[8px] shrink-0 w-[110px]" data-node-id="3:3708" data-name="Get started">
            <p className="[word-break:break-word] font-['Poppins:SemiBold'] leading-[1.6] not-italic relative shrink-0 text-[#fefbfc] text-[14px] text-center whitespace-nowrap" data-node-id="I3:3708;150:326">
              Get started
            </p>
          </a>
          <div className="bg-[#fefbfc] border border-[#8a38f5] border-solid content-stretch flex h-[37px] items-center justify-center px-[16px] py-[10px] relative rounded-[8px] shrink-0" data-node-id="3:3709">
            <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[1.6] not-italic relative shrink-0 text-[#8a38f5] text-[18px] text-center whitespace-nowrap" data-node-id="I3:3709;150:2460">
              Sign in to your account
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}