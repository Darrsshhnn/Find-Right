const assetPathPrefix = "./assets";
const imgGroup = `${assetPathPrefix}/3cb37.svg`;
const imgAntDesignSearchOutlined = `${assetPathPrefix}/cae0c.svg`;
const imgGroup1 = `${assetPathPrefix}/eb6a2.svg`;
const imgGroup2 = `${assetPathPrefix}/0dcf1.svg`;
const imgBoxiconsUserCircle = `${assetPathPrefix}/a27af.svg`;
const imgEpSetting = `${assetPathPrefix}/e7255.svg`;
const imgGroup14 = `${assetPathPrefix}/10540.svg`;
const imgButtonPlus = `${assetPathPrefix}/ca6c7.svg`;
const imgImage1 = `${assetPathPrefix}/3f8c7.png`;
const imgRectangle12 = `${assetPathPrefix}/04b9e.png`;
const imgRectangle13 = `${assetPathPrefix}/cafad.png`;
const imgRectangle14 = `${assetPathPrefix}/71e23.png`;
const imgImage2 = `${assetPathPrefix}/bff29.png`;
const imgRectangle15 = `${assetPathPrefix}/35386.png`;
const imgRectangle16 = `${assetPathPrefix}/85fba.png`;
const imgRectangle17 = `${assetPathPrefix}/bc242.png`;
const imgOriginalPhotography = `${assetPathPrefix}/f5bf1.png`;
const imgRectangle18 = `${assetPathPrefix}/56dc5.png`;
const imgRectangle19 = `${assetPathPrefix}/4646f.png`;
const imgRectangle20 = `${assetPathPrefix}/71e50.png`;
const imgRatingStar = `${assetPathPrefix}/9bc2a.svg`;
const imgEllipse = `${assetPathPrefix}/f7f5d.svg`;
const imgLine1 = `${assetPathPrefix}/0f110.svg`;
const imgEllipse1 = `${assetPathPrefix}/f89ca.svg`;

type NavBarProps = {
  className?: string;
  property1?: "Default";
};

function NavBar({ className, property1 = "Default" }: NavBarProps) {
  return (
    <div className={className || "bg-white border border-[rgba(0,0,0,0.3)] border-solid h-[818px] overflow-clip relative w-[90px]"} data-node-id="3:872">
      <div className="-translate-x-1/2 absolute bg-[#8a38f5] left-[calc(50%-1px)] overflow-clip rounded-[8px] size-[60px] top-[139px]" data-node-id="3:873">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute contents left-1/2 top-[calc(50%-5px)]" data-node-id="3:874">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[30px] top-[calc(50%-5px)]" data-node-id="3:875" data-name="akar-icons:home-alt1">
            <div className="absolute inset-[11.5%_12.5%_12.5%_12.5%]" data-node-id="3:876" data-name="Group">
              <div className="absolute inset-[-4.39%_-4.44%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup} />
              </div>
            </div>
          </div>
        </div>
        <p className="[word-break:break-word] absolute font-['Poppins:Medium'] leading-[normal] left-[calc(50%-15px)] not-italic text-[10px] text-white top-[40px] whitespace-nowrap" data-node-id="3:879">
          Home
        </p>
      </div>
      <button className="-translate-x-1/2 absolute bg-[#fefbfc] block border border-[#ddcbf5] border-solid cursor-pointer left-1/2 overflow-clip rounded-[8px] size-[60px] top-[219px]" data-node-id="3:880">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[30px] top-[calc(50%-5px)]" data-node-id="3:881" data-name="ant-design:search-outlined">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgAntDesignSearchOutlined} />
        </div>
        <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Medium'] leading-[normal] left-1/2 not-italic text-[#130b1e] text-[10px] text-center top-[39px] whitespace-nowrap" data-node-id="3:883">
          Find
        </p>
      </button>
      <button className="-translate-x-1/2 absolute bg-[#fefbfc] block border border-[#ddcbf5] border-solid cursor-pointer left-1/2 overflow-clip rounded-[8px] size-[60px] top-[299px]" data-node-id="3:884">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[30px] top-[calc(50%-5px)]" data-node-id="3:885" data-name="iconmind:affected-projects-outline-regular">
          <div className="absolute inset-[20.83%_12.5%_12.5%_12.5%]" data-node-id="3:886" data-name="Group">
            <div className="absolute inset-[-4.25%_-3.78%]">
              <img alt="" className="block max-w-none size-full" src={imgGroup1} />
            </div>
          </div>
        </div>
        <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Medium'] leading-[normal] left-[calc(50%+0.5px)] not-italic text-[#130b1e] text-[10px] text-center top-[39px] whitespace-nowrap" data-node-id="3:893">
          Projects
        </p>
      </button>
      <button className="-translate-x-1/2 absolute bg-[#fefbfc] block border border-[#ddcbf5] border-solid cursor-pointer left-1/2 overflow-clip rounded-[8px] size-[60px] top-[379px]" data-node-id="3:894">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[30px] top-[calc(50%-5px)]" data-node-id="3:895" data-name="bitcoin-icons:message-outline">
          <div className="absolute inset-[20.03%_14.58%_13.79%_14.58%]" data-node-id="3:896" data-name="Group">
            <div className="absolute inset-[-4.28%_-4%]">
              <img alt="" className="block max-w-none size-full" src={imgGroup2} />
            </div>
          </div>
        </div>
        <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Medium'] leading-[normal] left-[calc(50%+0.5px)] not-italic text-[#130b1e] text-[10px] text-center top-[39px] whitespace-nowrap" data-node-id="3:899">
          Chat
        </p>
      </button>
      <button className="-translate-x-1/2 absolute bg-[#fefbfc] block border border-[#ddcbf5] border-solid cursor-pointer left-1/2 overflow-clip rounded-[8px] size-[60px] top-[657px]" data-node-id="3:900">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[30px] top-[calc(50%-5px)]" data-node-id="3:901" data-name="boxicons:user-circle">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBoxiconsUserCircle} />
        </div>
        <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Medium'] leading-[normal] left-[calc(50%+0.5px)] not-italic text-[#130b1e] text-[10px] text-center top-[39px] whitespace-nowrap" data-node-id="3:904">
          Profile
        </p>
      </button>
      <button className="-translate-x-1/2 absolute bg-[#fefbfc] block border border-[#ddcbf5] border-solid cursor-pointer left-1/2 overflow-clip rounded-[8px] size-[60px] top-[737px]" data-node-id="3:905">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[30px] top-[calc(50%-5px)]" data-node-id="3:906" data-name="ep:setting">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEpSetting} />
        </div>
        <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Medium'] leading-[normal] left-[calc(50%+0.5px)] not-italic text-[#130b1e] text-[10px] text-center top-[39px] whitespace-nowrap" data-node-id="3:908">
          Settings
        </p>
      </button>
      <div className="absolute bg-white border-[0.5px] border-black border-solid left-[14px] overflow-clip rounded-[8px] size-[60px] top-[49px]" data-node-id="3:909" data-name="Logo">
        <div className="absolute h-[33.151px] left-[8px] top-[13px] w-[44.874px]" data-node-id="3:910">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup14} />
        </div>
      </div>
    </div>
  );
}

type ProfileActionsProps = {
  className?: string;
  property1?: "Default";
};

function ProfileActions({ className, property1 = "Default" }: ProfileActionsProps) {
  return (
    <button className={className || "border border-[#8a38f5] border-solid content-stretch flex items-center overflow-clip relative rounded-[9px]"} data-node-id="3:865">
      <div className="content-stretch flex h-[37px] items-center justify-center px-[30px] py-[10px] relative rounded-[8px] shrink-0 w-[110px]" data-node-id="3:866" data-name="Get started">
        <p className="[word-break:break-word] font-['Poppins:SemiBold'] leading-[1.6] not-italic relative shrink-0 text-[#8a38f5] text-[14px] text-center whitespace-nowrap" data-node-id="I3:866;150:326">
          Save
        </p>
      </div>
    </button>
  );
}

type CategoryChoicesProps = {
  className?: string;
  property1?: "Default";
};

function CategoryChoices({ className, property1 = "Default" }: CategoryChoicesProps) {
  return (
    <div className={className || "content-stretch flex gap-[9.957px] items-center relative w-[628.979px]"} data-node-id="3:828">
      <div className="bg-[#8a38f5] content-stretch flex flex-[1_0_0] h-[78px] items-center justify-center min-w-px p-[9.957px] relative rounded-[9px]" data-node-id="3:829">
        <p className="[word-break:break-word] flex-[1_0_0] font-['Poppins:Medium'] leading-[normal] min-w-px not-italic relative text-[#fefbfc] text-[14px] text-center" data-node-id="3:830">
          UI/UX Design
        </p>
      </div>
      <button className="bg-white border-[0.83px] border-[rgba(19,11,30,0.5)] border-solid content-stretch cursor-pointer flex flex-[1_0_0] h-[78px] items-center justify-center min-w-px px-[9.957px] py-[9px] relative rounded-[9.957px]" data-node-id="3:831">
        <p className="[word-break:break-word] flex-[1_0_0] font-['Poppins:Medium'] leading-[normal] min-w-px not-italic relative text-[#130b1e] text-[14px] text-center" data-node-id="3:832">
          Graphic Design
        </p>
      </button>
      <button className="bg-white border-[0.83px] border-[rgba(19,11,30,0.5)] border-solid content-stretch cursor-pointer flex flex-[1_0_0] h-[78px] items-center justify-center min-w-px px-[9.957px] py-[9px] relative rounded-[9.957px]" data-node-id="3:833">
        <p className="[word-break:break-word] flex-[1_0_0] font-['Poppins:Medium'] leading-[normal] min-w-px not-italic relative text-[#130b1e] text-[14px] text-center" data-node-id="3:834">
          Product Design
        </p>
      </button>
      <button className="bg-white border-[0.83px] border-[rgba(19,11,30,0.5)] border-solid content-stretch cursor-pointer flex flex-[1_0_0] h-[78px] items-center justify-center min-w-px px-[9.957px] py-[9px] relative rounded-[9.957px]" data-node-id="3:835">
        <p className="[word-break:break-word] flex-[1_0_0] font-['Poppins:Medium'] leading-[normal] min-w-px not-italic relative text-[#130b1e] text-[14px] text-center" data-node-id="3:836">
          Motion Design
        </p>
      </button>
    </div>
  );
}

function ButtonPlus({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[24px]"} data-node-id="3:823" data-name="Button/ Plus">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgButtonPlus} />
    </div>
  );
}

export default function ClientDashboard() {
  return (
    <div className="bg-[#fefbfc] relative size-full" data-node-id="3:4571" data-name="Client dashboard">
      <div className="absolute content-stretch flex h-[60px] items-center justify-center left-[calc(6.25%+29.54px)] p-[10px] top-[50px]" data-node-id="3:4572">
        <p className="[word-break:break-word] font-['Poppins:SemiBold'] leading-[normal] not-italic relative shrink-0 text-[36px] text-black whitespace-nowrap" data-node-id="3:4573">
          Welcome, Mr.Parekh
        </p>
      </div>
      <div className="absolute content-stretch flex h-[60px] items-center left-[calc(6.25%+29.54px)] p-[10px] top-[140px] w-[350px]" data-node-id="3:4574">
        <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[normal] not-italic relative shrink-0 text-[28px] text-black whitespace-nowrap" data-node-id="3:4575">
          Active Projects
        </p>
      </div>
      <a className="-translate-x-1/2 -translate-y-1/2 absolute bg-[#8a38f5] content-stretch cursor-pointer flex gap-[8px] h-[50px] items-center justify-center left-[calc(40.63%+31.02px)] p-[10px] rounded-[12px] top-[calc(50%-238.5px)] w-[240px]" data-node-id="3:4576" data-name="Continue">
        <div className="[word-break:break-word] flex flex-col font-['Poppins:Medium'] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-left text-white whitespace-nowrap" data-node-id="I3:4576;183:552">
          <p className="leading-[normal]">Create a new project</p>
        </div>
        <ButtonPlus className="relative shrink-0 size-[24px]" />
      </a>
      <CategoryChoices className="absolute content-stretch flex gap-[9.957px] items-center left-[calc(50%+59.33px)] top-[50px] w-[628.979px]" />
      <div className="absolute content-stretch flex flex-col gap-[12px] h-[673px] items-start left-[calc(50%+58.33px)] overflow-x-clip overflow-y-auto top-[145px] w-[629px]" data-node-id="3:4578">
        <div className="bg-white border border-[rgba(118,118,118,0.8)] border-solid h-[265px] overflow-clip relative rounded-[9px] shrink-0 w-full" data-node-id="3:4579" data-name="job profile">
          <div className="absolute left-[23px] overflow-clip rounded-[13px] size-[49px] top-[22px]" data-node-id="3:4580" data-name="Profile portrait">
            <div className="absolute h-[48px] left-0 top-px w-[49px]" data-node-id="3:4581" data-name="image 1">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1} />
            </div>
            <div className="absolute h-[48px] left-0 top-px w-[49px]" data-node-id="3:4582" data-name="image 2">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1} />
            </div>
          </div>
          <div className="absolute content-stretch flex flex-col gap-[3px] items-start left-[84px] overflow-clip top-[29.5px] w-[351px]" data-node-id="3:4583" data-name="Profile identity">
            <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-node-id="3:4584" data-name="Name and verification">
              <p className="[word-break:break-word] font-['Arimo:Regular'] font-normal leading-[normal] relative shrink-0 text-[#242424] text-[14px] whitespace-nowrap" data-node-id="3:4585">
                Umang Donga
              </p>
            </div>
            <p className="[word-break:break-word] font-['Arimo:Regular'] font-normal leading-[normal] min-w-full relative shrink-0 text-[#767676] text-[12px] w-[min-content]" data-node-id="3:4586">
              UI Designer
            </p>
          </div>
          <div className="absolute content-stretch flex gap-[5px] items-center overflow-clip right-[23px] top-[22px]" data-node-id="3:4587" data-name="Rating">
            <div className="relative shrink-0 size-[14px]" data-node-id="3:4588" data-name="Rating star">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgRatingStar} />
            </div>
            <p className="[word-break:break-word] font-['Arimo:Regular'] font-normal leading-[normal] relative shrink-0 text-[#242424] text-[13px] whitespace-nowrap" data-node-id="3:4589">
              3.5
            </p>
          </div>
          <div className="absolute bg-[#fefbfc] border border-[#8a38f5] border-solid content-stretch flex gap-[8px] h-[25px] items-center left-[460px] px-[16px] py-[8px] rounded-[20px] top-[46px] w-[144px]" data-node-id="3:4590" data-name="Point">
            <div className="relative shrink-0 size-[6px]" data-node-id="I3:4590;161:2650" data-name="Ellipse">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse} />
            </div>
            <p className="[word-break:break-word] font-['Poppins:SemiBold'] leading-[normal] not-italic relative shrink-0 text-[#645d75] text-[10px] whitespace-nowrap" data-node-id="I3:4590;161:2651">
              AI-assisted ideation
            </p>
          </div>
          <div className="absolute content-stretch flex gap-[9px] items-center left-[23px] top-[89px]" data-node-id="3:4591">
            <div className="h-[94px] relative rounded-[9px] shrink-0 w-[188px]" data-node-id="3:4592">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[9px] size-full" src={imgRectangle12} />
            </div>
            <div className="h-[94px] relative rounded-[9px] shrink-0 w-[188px]" data-node-id="3:4593">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[9px] size-full" src={imgRectangle13} />
            </div>
            <div className="h-[94px] relative rounded-[9px] shrink-0 w-[188px]" data-node-id="3:4594">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[9px] size-full" src={imgRectangle14} />
            </div>
          </div>
          <div className="absolute content-stretch flex flex-col items-start left-[23px] overflow-clip pt-[12px] top-[197px] w-[582px]" data-node-id="3:4595" data-name="Card footer">
            <div className="h-[37px] overflow-clip relative shrink-0 w-full" data-node-id="3:4596" data-name="Rate and actions">
              <p className="[word-break:break-word] absolute font-['Arimo:Regular'] font-normal leading-[normal] left-0 text-[#8a38f5] text-[13px] top-[11px] whitespace-nowrap" data-node-id="3:4597">
                • 32 completed projects
              </p>
              <div className="absolute border border-[#8a38f5] border-solid content-stretch flex items-center left-[357px] overflow-clip rounded-[9px] top-0" data-node-id="3:4598" data-name="Profile actions">
                <div className="content-stretch flex h-[37px] items-center justify-center px-[30px] py-[10px] relative rounded-[8px] shrink-0 w-[110px]" data-node-id="3:4599" data-name="Get started">
                  <p className="[word-break:break-word] font-['Poppins:SemiBold'] leading-[1.6] not-italic relative shrink-0 text-[#8a38f5] text-[14px] text-center whitespace-nowrap" data-node-id="I3:4599;150:326">
                    Save
                  </p>
                </div>
              </div>
              <div className="absolute bg-[#8324ff] content-stretch flex h-[37px] items-center justify-center left-[472px] px-[30px] py-[10px] rounded-[8px] top-0 w-[110px]" data-node-id="3:4600" data-name="Get started">
                <p className="[word-break:break-word] font-['Poppins:SemiBold'] leading-[1.6] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap" data-node-id="I3:4600;150:326">
                  View Profile
                </p>
              </div>
            </div>
          </div>
          <div className="absolute h-0 left-[23px] top-[197px] w-[582px]" data-node-id="3:4601">
            <div className="absolute inset-[-0.5px_0_0_0]">
              <img alt="" className="block max-w-none size-full" src={imgLine1} />
            </div>
          </div>
        </div>
        <div className="bg-white border border-[rgba(118,118,118,0.8)] border-solid h-[265px] overflow-clip relative rounded-[9px] shrink-0 w-[629px]" data-node-id="3:4602" data-name="job profile">
          <div className="absolute left-[23px] overflow-clip rounded-[13px] size-[49px] top-[22px]" data-node-id="3:4603" data-name="Profile portrait">
            <div className="absolute h-[48px] left-0 top-px w-[49px]" data-node-id="3:4604" data-name="image 1">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage2} />
            </div>
          </div>
          <div className="absolute content-stretch flex flex-col gap-[3px] items-start left-[84px] overflow-clip top-[29.5px] w-[351px]" data-node-id="3:4605" data-name="Profile identity">
            <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-node-id="3:4606" data-name="Name and verification">
              <p className="[word-break:break-word] font-['Arimo:Regular'] font-normal leading-[normal] relative shrink-0 text-[#242424] text-[14px] whitespace-nowrap" data-node-id="3:4607">
                Yashraj Gohil
              </p>
            </div>
            <p className="[word-break:break-word] font-['Arimo:Regular'] font-normal leading-[normal] min-w-full relative shrink-0 text-[#767676] text-[12px] w-[min-content]" data-node-id="3:4608">
              UX Designer
            </p>
          </div>
          <div className="absolute content-stretch flex gap-[5px] items-center overflow-clip right-[23px] top-[22px]" data-node-id="3:4609" data-name="Rating">
            <div className="relative shrink-0 size-[14px]" data-node-id="3:4610" data-name="Rating star">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgRatingStar} />
            </div>
            <p className="[word-break:break-word] font-['Arimo:Regular'] font-normal leading-[normal] relative shrink-0 text-[#242424] text-[13px] whitespace-nowrap" data-node-id="3:4611">
              4.0
            </p>
          </div>
          <div className="absolute bg-[#fefbfc] border border-[#8a38f5] border-solid content-stretch flex gap-[8px] h-[25px] items-center left-[460px] px-[16px] py-[8px] rounded-[20px] top-[46px] w-[144px]" data-node-id="3:4612" data-name="Point">
            <div className="relative shrink-0 size-[6px]" data-node-id="I3:4612;161:2650" data-name="Ellipse">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse} />
            </div>
            <p className="[word-break:break-word] font-['Poppins:SemiBold'] leading-[normal] not-italic relative shrink-0 text-[#645d75] text-[10px] whitespace-nowrap" data-node-id="I3:4612;161:2651">
              AI-assisted ideation
            </p>
          </div>
          <div className="absolute content-stretch flex gap-[9px] items-center left-[23px] top-[89px]" data-node-id="3:4613">
            <div className="h-[94px] relative rounded-[9px] shrink-0 w-[188px]" data-node-id="3:4614">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[9px] size-full" src={imgRectangle15} />
            </div>
            <div className="h-[94px] relative rounded-[9px] shrink-0 w-[188px]" data-node-id="3:4615">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[9px] size-full" src={imgRectangle16} />
            </div>
            <div className="h-[94px] relative rounded-[9px] shrink-0 w-[188px]" data-node-id="3:4616">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[9px] size-full" src={imgRectangle17} />
            </div>
          </div>
          <div className="absolute content-stretch flex flex-col items-start left-[23px] overflow-clip pt-[12px] top-[197px] w-[582px]" data-node-id="3:4617" data-name="Card footer">
            <div className="h-[37px] overflow-clip relative shrink-0 w-full" data-node-id="3:4618" data-name="Rate and actions">
              <p className="[word-break:break-word] absolute font-['Arimo:Regular'] font-normal leading-[normal] left-0 text-[#8a38f5] text-[13px] top-[11px] whitespace-nowrap" data-node-id="3:4619">
                • 32 completed projects
              </p>
              <ProfileActions className="absolute border border-[#8a38f5] border-solid content-stretch cursor-pointer flex items-center left-[357px] overflow-clip rounded-[9px] top-0" />
              <div className="absolute bg-[#8324ff] content-stretch flex h-[37px] items-center justify-center left-[472px] px-[30px] py-[10px] rounded-[8px] top-0 w-[110px]" data-node-id="3:4621" data-name="Get started">
                <p className="[word-break:break-word] font-['Poppins:SemiBold'] leading-[1.6] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap" data-node-id="I3:4621;150:326">
                  View Profile
                </p>
              </div>
            </div>
          </div>
          <div className="absolute h-0 left-[23px] top-[197px] w-[582px]" data-node-id="3:4622">
            <div className="absolute inset-[-0.5px_0_0_0]">
              <img alt="" className="block max-w-none size-full" src={imgLine1} />
            </div>
          </div>
        </div>
        <div className="bg-white border border-[rgba(118,118,118,0.8)] border-solid h-[265px] overflow-clip relative rounded-[9px] shrink-0 w-full" data-node-id="3:4623" data-name="job profile">
          <div className="absolute left-[23px] overflow-clip rounded-[13px] size-[49px] top-[22px]" data-node-id="3:4624" data-name="Profile portrait">
            <div className="absolute left-0 size-[49px] top-[0.5px]" data-node-id="3:4625" data-name="Original photography">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgOriginalPhotography} />
            </div>
          </div>
          <div className="absolute content-stretch flex flex-col gap-[3px] items-start left-[84px] overflow-clip top-[29.5px] w-[351px]" data-node-id="3:4626" data-name="Profile identity">
            <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-node-id="3:4627" data-name="Name and verification">
              <p className="[word-break:break-word] font-['Arimo:Regular'] font-normal leading-[normal] relative shrink-0 text-[#242424] text-[14px] whitespace-nowrap" data-node-id="3:4628">
                Darshan Solanki
              </p>
            </div>
            <p className="[word-break:break-word] font-['Arimo:Regular'] font-normal leading-[normal] min-w-full relative shrink-0 text-[#767676] text-[12px] w-[min-content]" data-node-id="3:4629">
              UI/UX Designer | Product Designer
            </p>
          </div>
          <div className="absolute content-stretch flex gap-[5px] items-center overflow-clip right-[23px] top-[22px]" data-node-id="3:4630" data-name="Rating">
            <div className="relative shrink-0 size-[14px]" data-node-id="3:4631" data-name="Rating star">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgRatingStar} />
            </div>
            <p className="[word-break:break-word] font-['Arimo:Regular'] font-normal leading-[normal] relative shrink-0 text-[#242424] text-[13px] whitespace-nowrap" data-node-id="3:4632">
              4.5
            </p>
          </div>
          <div className="absolute bg-[#fefbfc] border border-[#8a38f5] border-solid content-stretch flex gap-[8px] h-[25px] items-center left-[422px] px-[16px] py-[8px] rounded-[20px] top-[46px] w-[182px]" data-node-id="3:4633" data-name="Point">
            <div className="relative shrink-0 size-[6px]" data-node-id="I3:4633;161:2650" data-name="Ellipse">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse} />
            </div>
            <p className="[word-break:break-word] font-['Poppins:SemiBold'] leading-[normal] not-italic relative shrink-0 text-[#645d75] text-[10px] whitespace-nowrap" data-node-id="I3:4633;161:2651">
              No AI (100% human-made)
            </p>
          </div>
          <div className="absolute content-stretch flex gap-[9px] items-center left-[23px] top-[89px]" data-node-id="3:4634">
            <div className="h-[94px] relative rounded-[9px] shrink-0 w-[188px]" data-node-id="3:4635">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[9px] size-full" src={imgRectangle18} />
            </div>
            <div className="h-[94px] relative rounded-[9px] shrink-0 w-[188px]" data-node-id="3:4636">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[9px] size-full" src={imgRectangle19} />
            </div>
            <div className="h-[94px] relative rounded-[9px] shrink-0 w-[188px]" data-node-id="3:4637">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[9px] size-full" src={imgRectangle20} />
            </div>
          </div>
          <div className="absolute content-stretch flex flex-col items-start left-[23px] overflow-clip pt-[12px] top-[197px] w-[582px]" data-node-id="3:4638" data-name="Card footer">
            <div className="h-[37px] overflow-clip relative shrink-0 w-full" data-node-id="3:4639" data-name="Rate and actions">
              <p className="[word-break:break-word] absolute font-['Arimo:Regular'] font-normal leading-[normal] left-0 text-[#8a38f5] text-[13px] top-[11px] whitespace-nowrap" data-node-id="3:4640">
                • 26 completed projects
              </p>
              <ProfileActions className="absolute border border-[#8a38f5] border-solid content-stretch cursor-pointer flex items-center left-[357px] overflow-clip rounded-[9px] top-0" />
              <div className="absolute bg-[#8324ff] content-stretch flex h-[37px] items-center justify-center left-[472px] px-[30px] py-[10px] rounded-[8px] top-0 w-[110px]" data-node-id="3:4642" data-name="Get started">
                <p className="[word-break:break-word] font-['Poppins:SemiBold'] leading-[1.6] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap" data-node-id="I3:4642;150:326">
                  View Profile
                </p>
              </div>
            </div>
          </div>
          <div className="absolute h-0 left-[23px] top-[197px] w-[582px]" data-node-id="3:4643">
            <div className="absolute inset-[-0.5px_0_0_0]">
              <img alt="" className="block max-w-none size-full" src={imgLine1} />
            </div>
          </div>
        </div>
        <div className="bg-white border border-[rgba(118,118,118,0.8)] border-solid h-[265px] overflow-clip relative rounded-[9px] shrink-0 w-full" data-node-id="3:4644" data-name="job profile">
          <div className="absolute left-[23px] overflow-clip rounded-[13px] size-[49px] top-[22px]" data-node-id="3:4645" data-name="Profile portrait">
            <div className="absolute h-[48px] left-0 top-px w-[49px]" data-node-id="3:4646" data-name="image 1">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1} />
            </div>
          </div>
          <div className="absolute content-stretch flex flex-col gap-[3px] items-start left-[84px] overflow-clip top-[29.5px] w-[351px]" data-node-id="3:4647" data-name="Profile identity">
            <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-node-id="3:4648" data-name="Name and verification">
              <p className="[word-break:break-word] font-['Arimo:Regular'] font-normal leading-[normal] relative shrink-0 text-[#242424] text-[14px] whitespace-nowrap" data-node-id="3:4649">
                Yashraj Gohil
              </p>
            </div>
            <p className="[word-break:break-word] font-['Arimo:Regular'] font-normal leading-[normal] min-w-full relative shrink-0 text-[#767676] text-[12px] w-[min-content]" data-node-id="3:4650">
              UX Designer
            </p>
          </div>
          <div className="absolute content-stretch flex gap-[5px] items-center overflow-clip right-[23px] top-[22px]" data-node-id="3:4651" data-name="Rating">
            <div className="relative shrink-0 size-[14px]" data-node-id="3:4652" data-name="Rating star">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgRatingStar} />
            </div>
            <p className="[word-break:break-word] font-['Arimo:Regular'] font-normal leading-[normal] relative shrink-0 text-[#242424] text-[13px] whitespace-nowrap" data-node-id="3:4653">
              4.0
            </p>
          </div>
          <div className="absolute bg-[#fefbfc] border border-[#8a38f5] border-solid content-stretch flex gap-[8px] h-[25px] items-center left-[460px] px-[16px] py-[8px] rounded-[20px] top-[46px] w-[144px]" data-node-id="3:4654" data-name="Point">
            <div className="relative shrink-0 size-[6px]" data-node-id="I3:4654;161:2650" data-name="Ellipse">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse} />
            </div>
            <p className="[word-break:break-word] font-['Poppins:SemiBold'] leading-[normal] not-italic relative shrink-0 text-[#645d75] text-[10px] whitespace-nowrap" data-node-id="I3:4654;161:2651">
              AI-assisted ideation
            </p>
          </div>
          <div className="absolute content-stretch flex gap-[9px] items-center left-[23px] top-[89px]" data-node-id="3:4655">
            <div className="h-[94px] relative rounded-[9px] shrink-0 w-[188px]" data-node-id="3:4656">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[9px] size-full" src={imgRectangle15} />
            </div>
            <div className="h-[94px] relative rounded-[9px] shrink-0 w-[188px]" data-node-id="3:4657">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[9px] size-full" src={imgRectangle16} />
            </div>
            <div className="h-[94px] relative rounded-[9px] shrink-0 w-[188px]" data-node-id="3:4658">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[9px] size-full" src={imgRectangle17} />
            </div>
          </div>
          <div className="absolute content-stretch flex flex-col items-start left-[23px] overflow-clip pt-[12px] top-[197px] w-[582px]" data-node-id="3:4659" data-name="Card footer">
            <div className="h-[37px] overflow-clip relative shrink-0 w-full" data-node-id="3:4660" data-name="Rate and actions">
              <p className="[word-break:break-word] absolute font-['Arimo:Regular'] font-normal leading-[normal] left-0 text-[#8a38f5] text-[13px] top-[11px] whitespace-nowrap" data-node-id="3:4661">
                • 32 completed projects
              </p>
              <div className="absolute border border-[#8a38f5] border-solid content-stretch flex items-center left-[357px] overflow-clip rounded-[9px] top-0" data-node-id="3:4662" data-name="Profile actions">
                <div className="content-stretch flex h-[37px] items-center justify-center px-[30px] py-[10px] relative rounded-[8px] shrink-0 w-[110px]" data-node-id="3:4663" data-name="Get started">
                  <p className="[word-break:break-word] font-['Poppins:SemiBold'] leading-[1.6] not-italic relative shrink-0 text-[#8a38f5] text-[14px] text-center whitespace-nowrap" data-node-id="I3:4663;150:326">
                    Save
                  </p>
                </div>
              </div>
              <div className="absolute bg-[#8324ff] content-stretch flex h-[37px] items-center justify-center left-[472px] px-[30px] py-[10px] rounded-[8px] top-0 w-[110px]" data-node-id="3:4664" data-name="Get started">
                <p className="[word-break:break-word] font-['Poppins:SemiBold'] leading-[1.6] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap" data-node-id="I3:4664;150:326">
                  View Profile
                </p>
              </div>
            </div>
          </div>
          <div className="absolute h-0 left-[23px] top-[197px] w-[582px]" data-node-id="3:4665">
            <div className="absolute inset-[-0.5px_0_0_0]">
              <img alt="" className="block max-w-none size-full" src={imgLine1} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col gap-[25px] h-[608px] items-start left-[calc(6.25%+29.54px)] overflow-x-clip overflow-y-auto top-[210px] w-[616px]" data-node-id="3:4666">
        <div className="bg-white border border-[rgba(19,11,30,0.5)] border-solid content-stretch flex flex-col h-[186px] items-start px-[25px] py-[20px] relative rounded-[6px] shrink-0 w-full" data-node-id="3:4667">
          <div className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0 w-[566px]" data-node-id="3:4668">
            <div className="content-stretch flex gap-[14px] items-start relative shrink-0 w-full" data-node-id="3:4669">
              <div className="[word-break:break-word] content-stretch flex flex-col font-['Poppins:Medium'] gap-[10px] items-start not-italic relative shrink-0 w-[402px]" data-node-id="3:4670">
                <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-[20px] text-black w-full" data-node-id="3:4671">
                  <p className="leading-[normal]">Packaging for Noble Paws</p>
                </div>
                <p className="leading-[normal] relative shrink-0 text-[#767676] text-[12px] w-full" data-node-id="3:4672">
                  Create recyclable packs for organic pet food, made for everyday wellbeing.
                </p>
              </div>
              <div className="content-stretch flex flex-col gap-[15px] items-end relative shrink-0 w-[150px]" data-node-id="3:4673">
                <button className="border border-[#8a38f5] border-solid content-stretch cursor-pointer flex h-[40px] items-center justify-center p-[10px] relative rounded-[12px] shrink-0 w-full" data-node-id="3:4674" data-name="Continue">
                  <div className="[word-break:break-word] flex flex-col font-['Poppins:Medium'] justify-center leading-[0] not-italic relative shrink-0 text-[#130b1e] text-[16px] text-left whitespace-nowrap" data-node-id="I3:4674;496:3320">
                    <p className="leading-[normal]">Read Brief</p>
                  </div>
                </button>
                <div className="bg-[#fefbfc] border border-[#8a38f5] border-solid content-stretch flex gap-[8px] h-[25px] items-center px-[16px] py-[8px] relative rounded-[8px] shrink-0 w-full" data-node-id="3:4675" data-name="Point">
                  <div className="relative shrink-0 size-[6px]" data-node-id="I3:4675;161:2650" data-name="Ellipse">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse1} />
                  </div>
                  <p className="[word-break:break-word] font-['Poppins:SemiBold'] leading-[normal] not-italic relative shrink-0 text-[#5f26a8] text-[10px] whitespace-nowrap" data-node-id="I3:4675;161:2651">
                    AI-supported design
                  </p>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0 w-full" data-node-id="3:4676">
              <div className="[word-break:break-word] content-stretch flex font-['Poppins:Medium'] items-center justify-between not-italic relative shrink-0 text-[16px] text-black text-center w-full whitespace-nowrap" data-node-id="3:4677">
                <p className="leading-[0] relative shrink-0" data-node-id="3:4678">
                  <span className="leading-[normal]">{`Budget: `}</span>
                  <span className="font-['Inter:Medium'] font-medium leading-[normal]">₹</span>
                  <span className="leading-[normal]">4000-</span>
                  <span className="font-['Inter:Medium'] font-medium leading-[normal]">₹</span>
                  <span className="leading-[normal]">6000</span>
                </p>
                <p className="leading-[normal] relative shrink-0" data-node-id="3:4679">
                  Timeline: 2–3 weeks · 72%
                </p>
              </div>
              <div className="bg-[#fefbfc] border border-[rgba(19,11,30,0.5)] border-solid h-[10px] overflow-clip relative rounded-[10px] shrink-0 w-full" data-node-id="3:4680">
                <div className="-translate-y-1/2 absolute bg-[#8a38f5] h-[10px] left-[-1px] rounded-[10px] top-1/2 w-[376.2px]" data-node-id="3:4681" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white border border-[rgba(19,11,30,0.5)] border-solid content-stretch flex flex-col h-[186px] items-start px-[25px] py-[20px] relative rounded-[6px] shrink-0 w-full" data-node-id="3:4682">
          <div className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0 w-[566px]" data-node-id="3:4683">
            <div className="content-stretch flex gap-[14px] items-start relative shrink-0 w-full" data-node-id="3:4684">
              <div className="[word-break:break-word] content-stretch flex flex-col font-['Poppins:Medium'] gap-[10px] items-start not-italic relative shrink-0 w-[402px]" data-node-id="3:4685">
                <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-[20px] text-black w-full" data-node-id="3:4686">
                  <p className="leading-[normal]">Website Design for Noble Paws</p>
                </div>
                <p className="leading-[normal] relative shrink-0 text-[#767676] text-[12px] w-full" data-node-id="3:4687">
                  Design a welcoming shop that helps pet owners find the right daily nutrition.
                </p>
              </div>
              <div className="content-stretch flex flex-col gap-[15px] items-end relative shrink-0 w-[150px]" data-node-id="3:4688">
                <button className="border border-[#8a38f5] border-solid content-stretch cursor-pointer flex h-[40px] items-center justify-center p-[10px] relative rounded-[12px] shrink-0 w-full" data-node-id="3:4689" data-name="Continue">
                  <div className="[word-break:break-word] flex flex-col font-['Poppins:Medium'] justify-center leading-[0] not-italic relative shrink-0 text-[#130b1e] text-[16px] text-left whitespace-nowrap" data-node-id="I3:4689;496:3320">
                    <p className="leading-[normal]">Read Brief</p>
                  </div>
                </button>
                <div className="bg-[#fefbfc] border border-[#8a38f5] border-solid content-stretch flex gap-[8px] h-[25px] items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0 w-full" data-node-id="3:4690" data-name="Point">
                  <div className="relative shrink-0 size-[6px]" data-node-id="I3:4690;161:2650" data-name="Ellipse">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse1} />
                  </div>
                  <p className="[word-break:break-word] font-['Poppins:SemiBold'] leading-[normal] not-italic relative shrink-0 text-[#5f26a8] text-[10px] whitespace-nowrap" data-node-id="I3:4690;161:2651">
                    No AI Included
                  </p>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0 w-full" data-node-id="3:4691">
              <div className="[word-break:break-word] content-stretch flex font-['Poppins:Medium'] items-center justify-between not-italic relative shrink-0 text-[16px] text-black text-center w-full whitespace-nowrap" data-node-id="3:4692">
                <p className="leading-[0] relative shrink-0" data-node-id="3:4693">
                  <span className="leading-[normal]">{`Budget: `}</span>
                  <span className="leading-[normal]">₹</span>
                  <span className="leading-[normal]">6000-</span>
                  <span className="leading-[normal]">₹</span>
                  <span className="leading-[normal]">10000</span>
                </p>
                <p className="leading-[normal] relative shrink-0" data-node-id="3:4694">
                  Timeline: 2–3 weeks · 82%
                </p>
              </div>
              <div className="bg-[#fefbfc] border border-[rgba(19,11,30,0.5)] border-solid h-[10px] overflow-clip relative rounded-[10px] shrink-0 w-full" data-node-id="3:4695">
                <div className="-translate-y-1/2 absolute bg-[#8a38f5] h-[10px] left-[-1px] rounded-[10px] top-1/2 w-[427px]" data-node-id="3:4696" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white border border-[rgba(19,11,30,0.5)] border-solid content-stretch flex flex-col h-[186px] items-start px-[25px] py-[20px] relative rounded-[6px] shrink-0 w-full" data-node-id="3:4697">
          <div className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0 w-[566px]" data-node-id="3:4698">
            <div className="content-stretch flex gap-[14px] items-start relative shrink-0 w-full" data-node-id="3:4699">
              <div className="[word-break:break-word] content-stretch flex flex-col font-['Poppins:Medium'] gap-[10px] items-start not-italic relative shrink-0 w-[402px]" data-node-id="3:4700">
                <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-[20px] text-black w-full" data-node-id="3:4701">
                  <p className="leading-[normal]">Brand Identity for Noble Paws</p>
                </div>
                <p className="leading-[normal] relative shrink-0 text-[#767676] text-[12px] w-full" data-node-id="3:4702">
                  Build a warm, trusted identity for an organic pet food brand with a purpose.
                </p>
              </div>
              <div className="content-stretch flex flex-col gap-[15px] items-end relative shrink-0 w-[150px]" data-node-id="3:4703">
                <button className="border border-[#8a38f5] border-solid content-stretch cursor-pointer flex h-[40px] items-center justify-center p-[10px] relative rounded-[12px] shrink-0 w-full" data-node-id="3:4704" data-name="Continue">
                  <div className="[word-break:break-word] flex flex-col font-['Poppins:Medium'] justify-center leading-[0] not-italic relative shrink-0 text-[#130b1e] text-[16px] text-left whitespace-nowrap" data-node-id="I3:4704;496:3320">
                    <p className="leading-[normal]">Read Brief</p>
                  </div>
                </button>
                <div className="bg-[#fefbfc] border border-[#8a38f5] border-solid content-stretch flex gap-[8px] h-[25px] items-center px-[16px] py-[8px] relative rounded-[8px] shrink-0 w-full" data-node-id="3:4705" data-name="Point">
                  <div className="relative shrink-0 size-[6px]" data-node-id="I3:4705;161:2650" data-name="Ellipse">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse1} />
                  </div>
                  <p className="[word-break:break-word] font-['Poppins:SemiBold'] leading-[normal] not-italic relative shrink-0 text-[#5f26a8] text-[10px] whitespace-nowrap" data-node-id="I3:4705;161:2651">
                    AI-supported design
                  </p>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0 w-full" data-node-id="3:4706">
              <div className="[word-break:break-word] content-stretch flex font-['Poppins:Medium'] items-center justify-between not-italic relative shrink-0 text-[16px] text-black text-center w-full whitespace-nowrap" data-node-id="3:4707">
                <p className="leading-[0] relative shrink-0" data-node-id="3:4708">
                  <span className="leading-[normal]">{`Budget: `}</span>
                  <span className="leading-[normal]">₹</span>
                  <span className="leading-[normal]">3500-</span>
                  <span className="leading-[normal]">₹</span>
                  <span className="leading-[normal]">5000</span>
                </p>
                <p className="leading-[normal] relative shrink-0" data-node-id="3:4709">
                  Timeline: 2–3 weeks · 50%
                </p>
              </div>
              <div className="bg-[#fefbfc] border border-[rgba(19,11,30,0.5)] border-solid h-[10px] overflow-clip relative rounded-[10px] shrink-0 w-full" data-node-id="3:4710">
                <div className="-translate-y-1/2 absolute bg-[#8a38f5] h-[10px] left-[-1px] rounded-[10px] top-1/2 w-[279px]" data-node-id="3:4711" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white border border-[rgba(19,11,30,0.5)] border-solid content-stretch flex flex-col h-[186px] items-start px-[25px] py-[20px] relative rounded-[6px] shrink-0 w-full" data-node-id="3:4712">
          <div className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0 w-[566px]" data-node-id="3:4713">
            <div className="content-stretch flex gap-[14px] items-start relative shrink-0 w-full" data-node-id="3:4714">
              <div className="[word-break:break-word] content-stretch flex flex-col font-['Poppins:Medium'] gap-[10px] items-start not-italic relative shrink-0 w-[402px]" data-node-id="3:4715">
                <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-[20px] text-black w-full" data-node-id="3:4716">
                  <p className="leading-[normal]">Launch Campaign for Noble Paws</p>
                </div>
                <p className="leading-[normal] relative shrink-0 text-[#767676] text-[12px] w-full" data-node-id="3:4717">
                  Introduce organic pet nutrition with a campaign built around healthier pets.
                </p>
              </div>
              <div className="content-stretch flex flex-col gap-[15px] items-end relative shrink-0 w-[150px]" data-node-id="3:4718">
                <button className="border border-[#8a38f5] border-solid content-stretch cursor-pointer flex h-[40px] items-center justify-center p-[10px] relative rounded-[12px] shrink-0 w-full" data-node-id="3:4719" data-name="Continue">
                  <div className="[word-break:break-word] flex flex-col font-['Poppins:Medium'] justify-center leading-[0] not-italic relative shrink-0 text-[#130b1e] text-[16px] text-left whitespace-nowrap" data-node-id="I3:4719;496:3320">
                    <p className="leading-[normal]">Read Brief</p>
                  </div>
                </button>
                <div className="bg-[#fefbfc] border border-[#8a38f5] border-solid content-stretch flex gap-[8px] h-[25px] items-center px-[16px] py-[8px] relative rounded-[8px] shrink-0 w-full" data-node-id="3:4720" data-name="Point">
                  <div className="relative shrink-0 size-[6px]" data-node-id="I3:4720;161:2650" data-name="Ellipse">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse1} />
                  </div>
                  <p className="[word-break:break-word] font-['Poppins:SemiBold'] leading-[normal] not-italic relative shrink-0 text-[#5f26a8] text-[10px] whitespace-nowrap" data-node-id="I3:4720;161:2651">
                    AI-supported design
                  </p>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0 w-full" data-node-id="3:4721">
              <div className="[word-break:break-word] content-stretch flex font-['Poppins:Medium'] items-center justify-between not-italic relative shrink-0 text-[16px] text-black text-center w-full whitespace-nowrap" data-node-id="3:4722">
                <p className="leading-[0] relative shrink-0" data-node-id="3:4723">
                  <span className="leading-[normal]">Budget: 25000-</span>
                  <span className="leading-[normal]">₹</span>
                  <span className="leading-[normal]">5500</span>
                </p>
                <p className="leading-[normal] relative shrink-0" data-node-id="3:4724">
                  Timeline: 2–3 weeks · 72%
                </p>
              </div>
              <div className="bg-[#fefbfc] border border-[rgba(19,11,30,0.5)] border-solid h-[10px] overflow-clip relative rounded-[10px] shrink-0 w-full" data-node-id="3:4725">
                <div className="-translate-y-1/2 absolute bg-[#8a38f5] h-[10px] left-[-1px] rounded-[10px] top-1/2 w-[376.2px]" data-node-id="3:4726" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <NavBar className="absolute bg-white border border-[rgba(0,0,0,0.3)] border-solid h-[818px] left-0 overflow-clip top-0 w-[90px]" />
    </div>
  );
}