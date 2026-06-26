import type { ProductCategory, BundleContent } from '../types';
import type { Step, Product } from '../types';
import AccordionStep from '../components/AccordionStep';
import ReviewPanel from '../components/ReviewPanel';
import { getBundleData } from '../data/bundleData';

const _bundleData = getBundleData();
const steps = _bundleData.steps as Step[];
const allProducts = _bundleData.products as Product[];
const content = _bundleData.content as BundleContent;

function getProductsByCategory(category: ProductCategory): Product[] {
  return allProducts.filter((p) => p.category === category);
}

const BundleBuilderPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Mobile / Tablet hero (hidden on desktop) ── */}
      <div className="lg:hidden text-center pt-8 pb-2 px-4">
        <h1 className="text-[31.875px] font-['Gilroy-Bold',_sans-serif] leading-[110%] tracking-[-0.064px] text-[#1F1F1F]">{content.bundleBuilder.pageTitle}</h1>
      </div>

      {/* ── Desktop two-column layout ── */}
      <div className="max-w-[1440px] mx-auto md:px-[105px] py-8 md:py-[49px]">
        <div className="flex flex-col lg:flex-row lg:gap-[29px] items-start justify-center">

          {/* ── Left: Accordion steps (Stretches to 1213px on medium, 768px on large desktop) ── */}
          <main className="w-full lg:w-[768px] md:max-w-[1213px] lg:max-w-none flex-shrink-0">
            {/*
              Mobile:  no border, no shadow, no rounded corners — flat list
              Desktop: white card with border, shadow, rounded corners
            */}
            <div className="flex flex-col gap-[13px] w-full">
              {steps.map((step) => (
                <AccordionStep
                  key={step.id}
                  stepNumber={step.id}
                  totalSteps={steps.length}
                  icon={step.icon}
                  title={step.label}
                  category={step.category}
                  products={getProductsByCategory(step.category)}
                  nextLabel={step.nextLabel}
                />
              ))}
            </div>
          </main>

          {/* ── Right: Review panel (desktop sidebar - Frame 1736 layout visible only on large screens) ── */}
          <aside className="hidden lg:block w-[399px] flex-shrink-0">
            <ReviewPanel />
          </aside>

        </div>
      </div>

      {/* ── Mobile / Tablet / Medium Screens: Review panel below accordion ── */}
      <div className="lg:hidden mt-8 pb-8 md:px-[105px]">
        <ReviewPanel />
      </div>

    </div>
  );
};

export default BundleBuilderPage;
