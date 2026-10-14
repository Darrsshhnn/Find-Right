const assetPathPrefix = "./assets";
const imgVector5 = `${assetPathPrefix}/e5d86.png`;
const imgVector6 = `${assetPathPrefix}/693dd.png`;
const imgEllipse20 = `${assetPathPrefix}/b03fc.png`;
const imgEllipse21 = `${assetPathPrefix}/c0470.png`;
const imgVector7 = `${assetPathPrefix}/5588a.png`;
const imgEllipse22 = `${assetPathPrefix}/1b7ee.png`;
const imgEllipse23 = `${assetPathPrefix}/6d1a3.png`;
const imgVector8 = `${assetPathPrefix}/1d67e.png`;
const imgEllipse24 = `${assetPathPrefix}/c230d.png`;
const imgEllipse25 = `${assetPathPrefix}/94f36.png`;

type BgAnimationProps = {
  className?: string;
  property1?: "Frame 45" | "Frame 46" | "Frame 47";
};

export default function BgAnimation({ className, property1 = "Frame 45" }: BgAnimationProps) {
  const isFrame46 = property1 === "Frame 46";
  const isFrame47 = property1 === "Frame 47";
  return (
    <div className={className || "h-[839.076px] relative w-[1515.797px]"} id={isFrame47 ? "node-3_4530" : isFrame46 ? "node-3_4525" : "node-3_4520"}>
      <div className={`absolute flex items-center justify-center ${isFrame47 ? "h-[439.434px] left-[1145px] top-[448px] w-[453.073px]" : isFrame46 ? "h-[323.835px] left-[1086px] top-[522px] w-[363.7px]" : "h-[361.076px] left-0 top-[478px] w-[320.792px]"}`} id={isFrame47 ? "node-3_4531" : isFrame46 ? "node-3_4526" : "node-3_4521"}>
        <div className={`flex-none ${isFrame47 ? "rotate-[121.93deg]" : isFrame46 ? "rotate-[-86.38deg]" : "rotate-[3.09deg]"}`}>
          <div className="h-[345.264px] opacity-20 relative w-[302.618px]">
            <div className="absolute inset-[-7.94%_-8.39%_-6.92%_-8.39%]">
              <img alt="" className="block max-w-none size-full" height="396.564" src={isFrame47 ? imgVector8 : isFrame46 ? imgVector7 : imgVector5} width="353.418" />
            </div>
          </div>
        </div>
      </div>
      <div className={`absolute flex h-[363.359px] items-center justify-center w-[355.784px] ${isFrame47 ? "left-[345px] top-[486px]" : isFrame46 ? "left-[1105px] top-[-20px]" : "left-[10px] top-0"}`} id={isFrame47 ? "node-3_4532" : isFrame46 ? "node-3_4527" : "node-3_4522"}>
        <div className="flex-none rotate-[-122.8deg]">
          <div className="h-[247.46px] opacity-20 relative w-[272.802px]">
            <div className="absolute inset-[-11.07%_-9.31%_-9.66%_-9.31%]">
              <img alt="" className="block max-w-none size-full" height="298.76" src={imgVector6} width="323.602" />
            </div>
          </div>
        </div>
      </div>
      <div className={`absolute flex items-center justify-center ${isFrame47 ? "left-[127px] size-[400.375px] top-[-93px]" : isFrame46 ? "left-[161.08px] size-[392.44px] top-[520px]" : "left-[1054.23px] size-[461.563px] top-[277px]"}`} id={isFrame47 ? "node-3_4533" : isFrame46 ? "node-3_4528" : "node-3_4523"}>
        <div className={`flex-none ${isFrame47 ? "rotate-[9.82deg]" : isFrame46 ? "rotate-[171.76deg]" : "rotate-[115.43deg]"}`}>
          <div className="opacity-20 relative size-[346.378px]">
            <div className="absolute inset-[-6.9%]">
              <img alt="" className="block max-w-none size-full" height="394.178" src={isFrame47 ? imgEllipse24 : isFrame46 ? imgEllipse22 : imgEllipse20} width="394.178" />
            </div>
          </div>
        </div>
      </div>
      <div className={`absolute flex items-center justify-center ${isFrame47 ? "left-[400.22px] size-[266.048px] top-[91.17px]" : isFrame46 ? "left-0 size-[250.247px] top-[543.73px]" : "left-[965px] size-[303.727px] top-[522.88px]"}`} id={isFrame47 ? "node-3_4534" : isFrame46 ? "node-3_4529" : "node-3_4524"}>
        <div className={`flex-none ${isFrame47 ? "rotate-[101.44deg]" : isFrame46 ? "rotate-[-96.61deg]" : "rotate-[-152.94deg]"}`}>
          <div className="opacity-20 relative size-[225.747px]">
            <div className="absolute inset-[-12.14%_-11.25%_-10.59%_-11.25%]">
              <img alt="" className="block max-w-none size-full" height="277.047" src={isFrame47 ? imgEllipse25 : isFrame46 ? imgEllipse23 : imgEllipse21} width="276.547" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}