import React, { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext/AuthContext';
interface Answer {
  q: string;
  a: string;
}

interface OnboardingData {
  responses?: Answer[];
  pdfUrl?: string;
}

const OnboardingAnswers: React.FC = () => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const firestore = getFirestore();
        const docRef = doc(firestore, 'onboardingAnswers', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as OnboardingData;

          console.log("Responses:", data);
          setAnswers(data.responses || []);
          setPdfUrl(data.pdfUrl || null);
        }
      }
    };

    fetchData();
  }, [user]);

  console.log("Answers:", answers)

  const handleInputChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index].a = value;
    setAnswers(newAnswers);
  };

  const saveChanges = async () => {
    if (user) {
      const firestore = getFirestore();
      const docRef = doc(firestore, 'onboardingAnswers', user.uid);

      try {
        await updateDoc(docRef, { response: answers });
        alert('Responses updated successfully!');
      } catch (error) {
        console.error('Error updating document: ', error);
        alert('Failed to update responses.');
      }
    }
  };

  const downloadPdf = () => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white dark:bg-customblack rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-black dark:text-white mb-6">
        Onboarding Answers
      </h2>
      <div className="space-y-4">
        {answers.map((answer, index) => (
          <div key={index} className="p-4 border rounded-lg border-gray-200 dark:border-gray-700">
            <h3 className="font-medium text-lg text-gray-900 dark:text-gray-100">
              {answer.q}
            </h3>
            <input
              type="text"
              value={answer.a}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="mt-2 w-full p-2 border rounded-md dark:bg-customDarkGray dark:border-gray-600 dark:text-gray-300"
            />
          </div>
        ))}
      </div>
      <div className="mt-6 space-x-4">
        <button
          onClick={saveChanges}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Save Changes
        </button>
        {pdfUrl && (
          <button
            onClick={downloadPdf}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Download PDF
          </button>
        )}
      </div>
    </div>
  );
};

export default OnboardingAnswers;
