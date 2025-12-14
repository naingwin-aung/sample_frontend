import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { ChevronDown, ChevronRight, ChevronUp } from "lucide-react";
import OptionDetail from "./OptionDetail";

const SelectOptionItem = ({
  option,
  index,
  isExpanded,
  onToggle,
}: {
  option: any;
  index: number;
  isExpanded: boolean;
  onToggle: (index: number) => void;
}) => {
  return (
    <Accordion
      type="single"
      collapsible
      value={isExpanded ? "item-1" : ""}
      className={`w-full border rounded-2xl overflow-hidden cursor-pointer ${isExpanded ? "border-primary" : "border-gray-300"}`}
      onValueChange={() => onToggle(index)}
    >
      <AccordionItem value="item-1" className="border-b-0">
        <AccordionTrigger className="hover:no-underline p-0 [&[data-state=open]>div]:rounded-b-none [&>svg]:hidden">
          <div className="flex flex-col md:flex-row w-full h-auto md:h-[220px]">
            <div
              className="w-full md:w-1/4 h-full bg-cover bg-center rounded"
              style={{ backgroundImage: `url(${option.boat?.images[0].url})` }}
            ></div>
            <div className="w-full md:w-3/4 h-full py-4 px-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-medium line-clamp-1 text-left">
                  {
                    option.boat?.name
                  }
                </h3>
                <div className="p-1 rounded-full hover:bg-gray-100 transition cursor-pointer">
                  {isExpanded ? (
                    <ChevronUp strokeWidth={1.5} />
                  ) : (
                    <ChevronDown strokeWidth={1.5} />
                  )}
                </div>
              </div>

              <div className="w-full text-gray-600 mb-4 text-left overflow-hidden font-normal">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum
                non odit voluptatem repellendus, optio nihil. Accusantium autem
                distinctio, minus expedita qui,
              </div>

              <div
                className={`${
                  isExpanded
                    ? "mt-[26.5px]"
                    : "mt-auto flex flex-col md:flex-row md:justify-between md:items-center"
                }`}
              >
                <div className="font-normal underline text-gray-600 cursor-pointer flex  items-center">
                  <div>Package details</div>
                  <div>
                    <ChevronRight strokeWidth={1.5} size={23} />
                  </div>
                </div>
                {!isExpanded ? (
                  <div className="flex justify-end items-center gap-2">
                    <span className="text-lg text-gray-600 mt-1">From</span>
                    <span className="text-xl font-medium mt-1">THB 21,00</span>
                    <div className="rounded-lg bg-primary py-3 px-5 text-white font-medium text-center cursor-pointer text-sm hover:bg-orange-600 transition">
                      Select
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </AccordionTrigger>

        <AccordionContent className="p-6 border-t border-gray-100">
          <OptionDetail />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SelectOptionItem;
