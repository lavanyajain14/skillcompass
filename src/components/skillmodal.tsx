import React, { Fragment } from 'react';
import { Skill } from '@/types';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from 'lucide-react';

interface SkillModalProps {
  skill: Skill | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function SkillModal({ skill, isOpen, onClose }: SkillModalProps) {
  if (!skill) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-70 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-10 shadow-2xl transition-all">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <XIcon className="h-8 w-8" />
                </button>

                <Dialog.Title className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                  <span>{skill.icon}</span>
                  <span>{skill.title}</span>
                </Dialog.Title>

                <div className="space-y-4">
                  {skill.steps.map((step, index) => (
                    <a
                      key={index}
                      href={step.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <div className="flex justify-between items-center text-gray-800 hover:text-blue-600">
                        <span className="font-semibold">{step.name}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                        </svg>
                      </div>
                    </a>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}