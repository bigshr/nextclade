#pragma once

#include <optional>
#include <vector>

namespace Nextclade {
  struct AnalysisResult;
  struct QCResultSnpClusters;
  struct QCRulesConfigSnpClusters;

  std::optional<QCResultSnpClusters> ruleSnpClusters(//
    const AnalysisResult& result,                    //
    const QCRulesConfigSnpClusters& config           //
  );
}// namespace Nextclade
