import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MultipleSelector from "@/components/ui/multiple-selector";
import { Option } from "@/components/ui/multiple-selector";

const ASSETS_OPTIONS: Option[] = [
  { label: "nextjs", value: "nextjs", fixed: true },
  { label: "React", value: "react" },
  { label: "Remix", value: "remix" },
  { label: "Vite", value: "vite" },
  { label: "Nuxt", value: "nuxt" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
  { label: "Angular", value: "angular" },
  { label: "Ember", value: "ember", disable: true },
  { label: "Gatsby", value: "gatsby", disable: true, fixed: true },
  { label: "Astro", value: "astro" },
];
export default function CreatePoolPage({
  assetsValue,
  setAssetsValue,
  formData,
  onChange,
}: {
  assetsValue?: any;
  setAssetsValue?: any;
  formData?: any;
  onChange?: any;
}) {
  return (
    <div className="flex flex-col gap-4 md:gap-6 w-full items-center relative mt-6 md:mt-12">
      <div className=" w-full gap-6">
        <label className="font-Satoshi text-[16px] leading-[18px]  text-white">Pool Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          className="w-full h-11 md:h-[60px]  border border-white rounded-lg mt-3 md:mt-4 bg-secondaryPool-foreground"
        />
      </div>

      <div className=" w-full gap-6">
        <label className="font-Satoshi text-[16px] leading-[18px]  text-white">Assets</label>
        <MultipleSelector
          value={assetsValue}
          onChange={setAssetsValue}
          className="w-full min-h-11 md:min-h-[60px]  border border-white rounded-lg mt-3 md:mt-4 bg-secondaryPool-foreground"
          defaultOptions={ASSETS_OPTIONS}
          //placeholder="Select crypto assets you like..."
          emptyIndicator={<p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">no results found.</p>}
        />
      </div>

      <div className=" w-full gap-6">
        <label className="font-Satoshi text-[16px] leading-[18px]  text-white">Interest</label>
        <input
          type="text"
          name="interestRate"
          value={formData.interestRate}
          onChange={onChange}
          className="w-full h-11 md:h-[60px]  border border-white rounded-lg mt-3 md:mt-4 bg-secondaryPool-foreground"
        />
      </div>

      <div className=" w-full gap-6">
        <label className="font-Satoshi text-[16px] leading-[18px]  text-white">Collateral Percentage</label>
        <input
          type="text"
          name="collateralPercentage"
          value={formData.collateralPercentage}
          onChange={onChange}
          className="w-full h-11 md:h-[60px]  border border-white rounded-lg mt-3 md:mt-4 bg-secondaryPool-foreground"
        />
      </div>

      <div className=" w-full gap-6">
        <label className="font-Satoshi text-[16px] leading-[18px]  text-white">Tenor</label>

        <Select>
          <SelectTrigger className="w-full h-11 md:h-[60px]  border border-white rounded-lg mt-3 md:mt-4 bg-secondaryPool-foreground">
            <SelectValue placeholder="Select a duration" />
          </SelectTrigger>
          <SelectContent className=" bg-secondaryPool-foreground text-white">
            <SelectGroup>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
