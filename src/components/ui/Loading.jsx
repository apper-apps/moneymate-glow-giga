import React from "react";
import { cn } from "@/utils/cn";

const Loading = ({ className, rows = 3, showHeader = true }) => {
  return (
    <div className={cn("animate-pulse", className)}>
      {showHeader && (
        <div className="flex items-center justify-between mb-6">
          <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-48 shimmer"></div>
          <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-32 shimmer"></div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24 shimmer"></div>
              <div className="h-8 w-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg shimmer"></div>
            </div>
            <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32 shimmer mb-3"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20 shimmer"></div>
          </div>
        ))}
      </div>
      
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-40 shimmer"></div>
        </div>
        <div className="divide-y divide-gray-100">
          {[...Array(rows)].map((_, i) => (
            <div key={i} className="p-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg shimmer"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32 shimmer"></div>
                  <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24 shimmer"></div>
                </div>
              </div>
              <div className="text-right space-y-2">
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20 shimmer"></div>
                <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16 shimmer"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;