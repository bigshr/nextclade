import React from 'react'

import { useTranslation } from 'react-i18next'
import { Col, Row } from 'reactstrap'
import styled from 'styled-components'

import FastaFileList from 'src/components/Main//FastaFileList'

export const FeatureBoxContainer = styled.div`
  margin: 10px 5px;

  max-height: 400px;
  overflow-y: auto;

  // @media (max-width: 767.98px) {
  //   display: none;
  // }
`

export const FeatureBox = styled.div`
  margin: 3px 5px;
  padding: 20px 10px;
  border-radius: 3px;
  box-shadow: ${(props) => props.theme.shadows.light};

  h3 {
    font-size: 1.25rem;
    font-weight: bold;
  }

  p {
    font-size: 0.75rem;
    text-align: center;
  }
`

export const FeatureBoxTop = styled(FeatureBox)`
  min-height: 120px;
  color: #3a6598;
`

export const FeatureBoxBottom = styled(FeatureBox)`
  color: #6d9239;
  height: 200px;
`

export function MainSectionHeroFeatures() {
  const { t } = useTranslation()

  return (
    <FeatureBoxContainer>
      <Row noGutters className="mx-auto text-center">
        <Col className="mb-2">
          <FeatureBoxTop>
            <h3>{t('Demo Fasta Files')}</h3>
            <p>{t('Click on the following demo fasta files for quick analysis examples.')}</p>
            <FastaFileList></FastaFileList>
          </FeatureBoxTop>
        </Col>

      </Row>
    </FeatureBoxContainer>
  )
}
