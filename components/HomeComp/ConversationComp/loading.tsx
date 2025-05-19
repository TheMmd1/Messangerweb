'use client';

export default function Loading({ dir }: { dir: string }) {
  const emptyArray = Array(7).fill(null);
  return (
    <div
      dir={`${dir === 'fa' ? 'rtl' : 'ltr'}`}
      className="md:item-start your-component-scrollbar mb-5 flex h-[100dvh] w-full flex-col items-center justify-start pb-[30dvh]"
    >
      {emptyArray?.map((_, index) => (
        <div key={index} className="relative flex min-h-[10dvh] w-full cursor-pointer items-center justify-center rounded-[20px] px-2 sm:px-3">
          <div className="flex min-h-[10dvh] w-full items-center justify-between gap-3 rounded px-2">
            <div className="flex items-center gap-3">
              <div className="h-[8dvh] w-[8dvh] animate-pulse rounded-full bg-gray-200"></div>
              <div>
                <div className="mb-2 h-[2dvh] w-[8dvh] animate-pulse rounded bg-gray-200"></div>
                <div className="h-[2dvh] w-[15dvh] animate-pulse rounded bg-gray-200"></div>
              </div>
            </div>
            <div className="h-[2dvh] w-[4dvh] animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
