import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@ui/accordion";
import QandAs from "@constants/landingpage/qAndAs";

const LandingPageQAndA = () => {
  return (
    <div className="flex flex-col items-center font-inter w-full mt-32">
      <div className="bg-primary/5 max-w-[880px] w-full gap-28 py-16 flex flex-col items-center rounded-[72px] p-5">
        <div className="flex flex-col items-center justify-center font-bold ">
          <h3 className="text-5xl">Your questions,</h3>
          <h3 className="text-5xl text-primary">answered</h3>
        </div>
        <Accordion
          type="single"
          defaultValue={QandAs[0].title}
          collapsible
          className="w-full max-w-[737px] border rounded-3xl p-12"
        >
          {QandAs.map((qAndA) => (
            <AccordionItem
              key={qAndA.title}
              value={qAndA.title}
              className="w-full"
            >
              <AccordionTrigger className="font-semibold text-start text-xl w-full flex items-start justify-between">
                {qAndA.title}
              </AccordionTrigger>
              <AccordionContent className="font-normal flex flex-col gap-3">
                {qAndA.paragraphs.map((p) => (
                  <p>{p}</p>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default LandingPageQAndA;
