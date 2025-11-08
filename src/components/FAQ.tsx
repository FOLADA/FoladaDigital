import React, { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "რამდენი დრო სჭირდება ვებსაიტის დამზადებას?",
      answer: "ვებსაიტის შექმნის დრო დამოკიდებულია დიზაინის სირთულესა და ფუნქციონალზე. საშუალოდ, სტანდარტული ბიზნეს ვებსაიტი მზად არის 7-14 სამუშაო დღეში. უფრო რთული პროექტები (მაგ. ონლაინ მაღაზია ან უნიკალური დიზაინი) შეიძლება გაგრძელდეს 3-4 კვირამდე."
    },
    {
      question: "რა ღირს ვებსაიტის შექმნა?",
      answer: "ფასი ინდივიდუალურია და დამოკიდებულია თქვენს მიზნებზე. საბაზისო ვებსაიტი იწყება 500 ლარიდან, ხოლო სრული ბრენდის ვებსაიტი, ინტეგრაციებითა და დიზაინით — 1000 ლარიდან. პირველადი კონსულტაცია სრულიად უფასოა."
    },
    {
      question: "გაქვთ თუ არა თანხის დაბრუნების გარანტია?",
      answer: "დიახ. ვთავაზობთ 30 დღიან თანხის დაბრუნების გარანტიას. თუ შედეგით სრულად კმაყოფილი არ დარჩებით, თანხას სრულად დაგიბრუნებთ — ყოველგვარი დამატებითი კითხვის გარეშე."
    },
    {
      question: "რა უპირატესობა აქვს თქვენს ვებსაიტებს?",
      answer: "ჩვენი ვებსაიტები თანამედროვე, სწრაფი და მობილურ მოწყობილობებზე მორმებულია. ვიყენებთ SEO ოპტიმიზაციის სტანდარტებს, რათა თქვენი ბიზნესი Google-ში უფრო მარტივად იპოვონ მომხმარებლებმა."
    },
    {
      question: "ამზადებთ თუ არა SEO ოპტიმიზებულ ვებსაიტებს?",
      answer: "დიახ, ყველა ჩვენი ვებსაიტი ტექნიკურად და შინაარსობრივად SEO-ოპტიმიზებულია. დამატებით შეგვიძლია შემოგთავაზოთ სრულფასოვანი SEO პაკეტი, რომელიც ზრდის თქვენი საიტის ხილვადობას Google-ის პირველ გვერდებზე."
    },
    {
      question: "ახორციელებთ თუ არა სოციალურ მედია მარკეტინგს?",
      answer: "კი, ვმართავთ Facebook, Instagram და Google Ads კამპანიებს, რომლებიც მოაქვს რეალული შედეგები — არა მხოლოდ ნახვები, არამედ გაყიდვები. კამპანიების ოპტიმიზაცია ტარდება თქვენი მიზნების მიხედვით."
    },
    {
      question: "როგორ შეიძლება თქვენთან თანამშრომლობა დავიწყო?",
      answer: "დაგვიკავშირდით ვებსაიტზე მითითებული ფორმით ან მოგვწერეთ WhatsApp-ზე. პირველადი კონსულტაცია უფასოა, სადაც განვიხილავთ თქვენს ბიზნესს, მიზნებს და შემოგთავაზებთ საუკეთესო გადაწყვეტას."
    }
  ];

  return (
    <section id="faq" className="py-16 md:py-20 bg-black w-full">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          {/* Reduced font size to prevent overflow */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-8 bg-gradient-to-r from-[rgb(255,0,0)] to-[rgb(255,0,0)] bg-clip-text text-transparent">
            ხშირად დასმული კითხვები
          </h2>
          <div className="flex justify-center mt-6 md:mt-8">
            <div className="w-16 md:w-24 h-1 bg-[rgb(255,0,0)] rounded-full"></div>
          </div>
        </div>

        {/* Added max-width constraint to prevent overflow */}
        <div className="max-w-4xl mx-auto w-full px-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="mb-4 md:mb-6 border border-gray-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-red-600"
            >
              <button
                className="w-full flex justify-between items-center p-6 md:p-8 text-left bg-gray-900 hover:bg-gray-800 transition-colors duration-300"
                onClick={() => toggleAccordion(index)}
              >
                {/* Reduced font size to prevent overflow */}
                <h3 className="text-lg md:text-xl font-semibold text-white font-copy">{faq.question}</h3>
                <div className="ml-4 flex-shrink-0">
                  <svg 
                    className={`w-6 h-6 md:w-8 md:h-8 text-[rgb(255,0,0)] transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 md:p-8 bg-gray-900">
                  {/* Reduced font size to prevent overflow */}
                  <p className="text-gray-300 text-sm md:text-base font-copy">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;