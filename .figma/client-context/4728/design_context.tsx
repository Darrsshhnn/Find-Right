const assetPathPrefix = "./assets";
const imgAvatar = `${assetPathPrefix}/4f7cd.png`;
const imgVector = `${assetPathPrefix}/6a54c.svg`;
const imgLine3 = `${assetPathPrefix}/ba514.svg`;
const imgFrame = `${assetPathPrefix}/f6498.svg`;
const imgFrame1 = `${assetPathPrefix}/f1bd3.svg`;
const imgGroup14 = `${assetPathPrefix}/e88ce.svg`;
const imgChevronDown = `${assetPathPrefix}/636a4.svg`;

export default function WelcomeScreen() {
  return (
    <div className="bg-[#fefbfc] relative size-full" data-node-id="3:4728" data-name="Welcome Screen">
      <p className="[word-break:break-word] absolute font-['Poppins:Medium'] leading-[normal] left-[348px] not-italic text-[32px] text-black top-[118px] w-[310px]" data-node-id="3:4729">{`Earning & payouts`}</p>
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Medium'] leading-[normal] left-[718px] not-italic text-[16px] text-[rgba(19,11,30,0.5)] text-center top-[170px] w-[740px]" data-node-id="3:4730">
        Manage your payout account, track escrow milestones, and review verified disbursements.
      </p>
      <div className="[word-break:break-word] absolute bg-white border-[#e2d9e9] border-[0.895px] border-solid content-stretch flex flex-col gap-[8.954px] h-[140px] items-start left-[348px] not-italic overflow-clip p-[22.385px] rounded-[16.117px] top-[266px] w-[266px] whitespace-nowrap" data-node-id="3:4731" data-name="Metric card">
        <p className="font-['Inter:Regular'] font-normal leading-[normal] relative shrink-0 text-[#71647f] text-[14px]" data-node-id="3:4732">
          Available for withdrawal
        </p>
        <p className="font-['Inter:Medium'] font-medium leading-[1.08] relative shrink-0 text-[#09030f] text-[26.862px]" data-node-id="3:4733">
          2,430.00
        </p>
        <p className="font-['Inter:Regular'] font-normal leading-[normal] relative shrink-0 text-[#3ebb3e] text-[10.745px]" data-node-id="3:4734">
          Ready for payout
        </p>
      </div>
      <div className="absolute bg-white border-[#e2d9e9] border-[0.895px] border-solid h-[216px] left-[348px] overflow-clip rounded-[16.117px] top-[454px] w-[846px]" data-node-id="3:4735" data-name="Metric card">
        <p className="[word-break:break-word] absolute font-['Poppins:Medium'] h-[27px] leading-[normal] left-[21.49px] not-italic text-[18px] text-black top-[21.49px] w-[286px]" data-node-id="3:4736">
          Direct deposit payout account
        </p>
        <p className="[word-break:break-word] absolute font-['Inter:Regular'] font-normal leading-[normal] left-[21.11px] not-italic text-[#71647f] text-[14px] top-[48.1px] whitespace-nowrap" data-node-id="3:4737">{`Primary destination for milestone earning `}</p>
        <div className="absolute bg-[#fefbfc] border border-[#8a38f5] border-solid h-[72px] left-[21.11px] overflow-clip rounded-[20px] top-[93.11px] w-[802px]" data-node-id="3:4738">
          <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[normal] left-[61px] not-italic text-[14px] text-black top-[26px] whitespace-nowrap" data-node-id="3:4739">
            State Bank of India . . . 87394
          </p>
          <div className="absolute inset-[calc(36.11%-0.28px)_calc(94.26%+0.89px)_calc(37.5%-0.25px)_calc(3.24%-0.94px)]" data-node-id="3:4740" data-name="Vector">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector} />
          </div>
          <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold h-[17px] leading-[normal] left-[705px] not-italic text-[#8a38f5] text-[14px] top-[26px] w-[55px]" data-node-id="3:4741">
            Manage
          </p>
        </div>
        <div className="absolute contents left-[713.11px] top-[33.1px]" data-node-id="3:4742">
          <div className="absolute bg-[#d3ead3] h-[18px] left-[714px] rounded-[7px] top-[34px] w-[115px]" data-node-id="3:4743" />
          <p className="[word-break:break-word] absolute font-['Inter:Regular'] font-normal h-[14px] leading-[normal] left-[719px] not-italic text-[#3ebb3e] text-[13px] top-[35px] w-[107px]" data-node-id="3:4744">
            Ready for payout
          </p>
        </div>
      </div>
      <div className="absolute bg-white border-[#e2d9e9] border-[0.895px] border-solid h-[315px] left-[348px] overflow-clip rounded-[16.117px] top-[720px] w-[846px]" data-node-id="3:4745" data-name="Metric card">
        <p className="[word-break:break-word] absolute font-['Poppins:Medium'] h-[27px] leading-[normal] left-[21.49px] not-italic text-[18px] text-black top-[21.49px] w-[286px]" data-node-id="3:4746">{`Disbursement & escrow history`}</p>
        <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium h-[27px] leading-[normal] left-[735.11px] not-italic text-[18px] text-black top-[84.11px] w-[79px]" data-node-id="3:4747">
          +₹45,00
        </p>
        <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium h-[27px] leading-[normal] left-[738.11px] not-italic text-[18px] text-black top-[148.1px] w-[76px]" data-node-id="3:4748">
          +₹45,00
        </p>
        <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium h-[27px] leading-[normal] left-[731.11px] not-italic text-[18px] text-black top-[205.1px] w-[83px]" data-node-id="3:4749">
          +₹1,5000
        </p>
        <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[normal] left-[21.11px] not-italic text-[14px] text-black top-[90.11px] whitespace-nowrap" data-node-id="3:4750">{`Botanica skincare brand identity & packaging `}</p>
        <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[normal] left-[21.11px] not-italic text-[14px] text-black top-[151.1px] whitespace-nowrap" data-node-id="3:4751">
          Verde Specialty Roastery Packaging
        </p>
        <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[normal] left-[21.11px] not-italic text-[14px] text-black top-[212.1px] whitespace-nowrap" data-node-id="3:4752">{`Artisanal Oat Milk Brand Identity & Sustainable Carton Packaging`}</p>
        <p className="[word-break:break-word] absolute font-['Inter:Regular'] font-normal leading-[normal] left-[21.11px] not-italic text-[#71647f] text-[14px] top-[108.11px] whitespace-nowrap" data-node-id="3:4753">
          Client: Lumina Organics - Sep 19, 2026
        </p>
        <p className="[word-break:break-word] absolute font-['Inter:Regular'] font-normal leading-[normal] left-[641.11px] not-italic text-[#3ebb3e] text-[14px] top-[108.11px] whitespace-nowrap" data-node-id="3:4754">
          Paid out via bank transfer
        </p>
        <p className="[word-break:break-word] absolute font-['Inter:Regular'] font-normal leading-[normal] left-[640.11px] not-italic text-[#3ebb3e] text-[14px] top-[172.1px] whitespace-nowrap" data-node-id="3:4755">
          Paid out via bank transfer
        </p>
        <p className="[word-break:break-word] absolute font-['Inter:Regular'] font-normal leading-[normal] left-[668.11px] not-italic text-[#fb9c01] text-[14px] top-[229.1px] whitespace-nowrap" data-node-id="3:4756">
          Held in active escrow
        </p>
        <p className="[word-break:break-word] absolute font-['Inter:Regular'] font-normal leading-[normal] left-[21.11px] not-italic text-[#71647f] text-[14px] top-[169.1px] w-[251px]" data-node-id="3:4757">
          Client: Verde Roasters - Aug 24, 2026
        </p>
        <p className="[word-break:break-word] absolute font-['Inter:Regular'] font-normal leading-[normal] left-[21.11px] not-italic text-[#71647f] text-[14px] top-[230.1px] w-[286px]" data-node-id="3:4758">{`Client: Darshan shridhar - Current contract `}</p>
        <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold h-[17px] leading-[normal] left-[731.11px] not-italic text-[#8a38f5] text-[14px] top-[24.11px] w-[76px]" data-node-id="3:4759">
          View more
        </p>
        <div className="absolute h-0 left-[21.11px] top-[136.1px] w-[790px]" data-node-id="3:4760">
          <div className="absolute inset-[-1px_0_0_0]">
            <img alt="" className="block max-w-none size-full" src={imgLine3} />
          </div>
        </div>
        <div className="absolute h-0 left-[21.61px] top-[197.1px] w-[790px]" data-node-id="3:4761">
          <div className="absolute inset-[-1px_0_0_0]">
            <img alt="" className="block max-w-none size-full" src={imgLine3} />
          </div>
        </div>
        <div className="absolute h-0 left-[21.61px] top-[258.11px] w-[790px]" data-node-id="3:4762">
          <div className="absolute inset-[-1px_0_0_0]">
            <img alt="" className="block max-w-none size-full" src={imgLine3} />
          </div>
        </div>
      </div>
      <div className="[word-break:break-word] absolute bg-white border-[#e2d9e9] border-[0.895px] border-solid content-stretch flex flex-col gap-[8.954px] h-[140px] items-start left-[638px] not-italic overflow-clip p-[22.385px] rounded-[16.117px] top-[266px] w-[266px] whitespace-nowrap" data-node-id="3:4763" data-name="Metric card">
        <p className="font-['Inter:Regular'] font-normal leading-[normal] relative shrink-0 text-[#71647f] text-[13.431px]" data-node-id="3:4764">
          currently held in escrow
        </p>
        <p className="font-['Inter:Medium'] font-medium leading-[1.08] relative shrink-0 text-[#09030f] text-[26.862px]" data-node-id="3:4765">
          1,500.00
        </p>
        <p className="font-['Inter:Regular'] font-normal leading-[normal] relative shrink-0 text-[#ff9d00] text-[10.745px]" data-node-id="3:4766">
          Released upon client approval
        </p>
      </div>
      <div className="[word-break:break-word] absolute bg-white border-[#e2d9e9] border-[0.895px] border-solid content-stretch flex flex-col gap-[8.954px] h-[140px] items-start left-[928px] not-italic overflow-clip p-[22.385px] rounded-[16.117px] top-[266px] w-[266px] whitespace-nowrap" data-node-id="3:4767" data-name="Metric card">
        <p className="font-['Inter:Regular'] font-normal leading-[normal] relative shrink-0 text-[#71647f] text-[13.431px]" data-node-id="3:4768">
          Lifetime earnings on FindRight
        </p>
        <p className="font-['Inter:Medium'] font-medium leading-[1.08] relative shrink-0 text-[#09030f] text-[26.862px]" data-node-id="3:4769">
          18,500.00
        </p>
        <p className="font-['Inter:Regular'] font-normal leading-[normal] relative shrink-0 text-[#71647f] text-[10.745px]" data-node-id="3:4770">
          Across 14 complated milstones
        </p>
      </div>
      <div className="absolute left-[461px] size-[13px] top-[352px]" data-node-id="3:4771" data-name="Frame">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame} />
      </div>
      <div className="absolute left-[816px] size-[11px] top-[352px]" data-node-id="3:4775" data-name="Frame">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame1} />
      </div>
      <div className="absolute bg-white content-stretch flex flex-col h-[70px] items-start left-0 pb-[7px] pl-[16px] pr-[55px] pt-[3px] top-0 w-[1440px]" data-node-id="3:4780" data-name="Nav bar">
        <div className="h-[59px] overflow-clip relative shrink-0 w-full" data-node-id="3:4781" data-name="Navigation content">
          <div className="absolute content-stretch flex gap-[68px] items-center left-[13px] top-[6.72px]" data-node-id="3:4782">
            <div className="h-[50px] relative shrink-0 w-[156px]" data-node-id="3:4783">
              <div className="absolute content-stretch flex gap-[11px] items-center left-0 top-0" data-node-id="3:4784">
                <div className="bg-[#fefbfc] border border-[#130b1e] border-solid overflow-clip relative rounded-[8px] shrink-0 size-[50px]" data-node-id="3:4785" data-name="Logo">
                  <div className="absolute h-[33.151px] left-[2.5px] top-[8.5px] w-[44.874px]" data-node-id="3:4786">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup14} />
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Poppins:Bold'] leading-[normal] not-italic relative shrink-0 text-[#130b1e] text-[18px] whitespace-nowrap" data-node-id="3:4790">
                  FindRight
                </p>
              </div>
            </div>
            <div className="[word-break:break-word] content-stretch flex font-['Poppins:Regular'] gap-[30px] items-center leading-[18.013px] not-italic relative shrink-0 text-[#6c6177] text-[12.609px] whitespace-nowrap" data-node-id="3:4791">
              <p className="relative shrink-0" data-node-id="3:4792">
                Available projects
              </p>
              <p className="relative shrink-0" data-node-id="3:4793">
                Workspace
              </p>
              <p className="relative shrink-0" data-node-id="3:4794">
                Level progression
              </p>
              <p className="relative shrink-0" data-node-id="3:4795">
                Earnings
              </p>
            </div>
            <div className="bg-[#fffbfd] border-[#e4dae9] border-[0.901px] border-solid content-stretch flex gap-[8.106px] h-[43.232px] items-center overflow-clip pl-[4.503px] pr-[9.007px] py-[4.503px] relative rounded-[9.907px] shrink-0 w-[128.794px]" data-node-id="3:4796" data-name="Profile control">
              <div className="relative rounded-[7.205px] shrink-0 size-[32.424px]" data-node-id="3:4797" data-name="Avatar">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[7.205px] size-full" src={imgAvatar} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col items-start not-italic overflow-clip relative shrink-0 w-[59.443px]" data-node-id="3:4798" data-name="Profile details">
                <p className="font-['Poppins:Medium'] leading-[17.113px] relative shrink-0 text-[#130b1e] text-[12.609px] w-full" data-node-id="3:4799">
                  Vrushti
                </p>
                <p className="font-['Poppins:Regular'] leading-[13.51px] relative shrink-0 text-[#6c6177] text-[9.907px] w-full" data-node-id="3:4800">
                  Designer
                </p>
              </div>
              <div className="relative shrink-0 size-[12.609px]" data-node-id="3:4801" data-name="chevron-down">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgChevronDown} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}