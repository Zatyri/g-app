import React from 'react'
import { Header } from 'semantic-ui-react'
import { XorVIcon } from '../utils/FormHelpers'
import { OperatorLogo } from '../utils/OperatorLogo'
import CompareSubRow from './CompareSubRow'

const CompareOfferTable = ({currentSub, offerSub, currentSubOffer, handleManualOffer, shoppingCart}) => {   
  return (
    <>
      <div className={`compereRowContainer ${shoppingCart && 'shoppingCartOfferTable'}`}>
          <div className="compareHeader">
            <div className="flexColumn">
              <OperatorLogo operator={currentSub.operator.name} />
              <Header as="h3">{currentSub.name}</Header>
            </div>
            <span />
            <div className="flexColumn">
              <OperatorLogo operator={offerSub.operator.name} />
              <Header as="h3">{offerSub.name}</Header>
            </div>
          </div>

          <CompareSubRow
            feature="Puhe"
            suffix="min"
            current={currentSub.talk}
            compareTo={offerSub.talk}
          />
          <CompareSubRow
            feature="Viestit"
            suffix="kpl"
            current={currentSub.sms}
            compareTo={offerSub.sms}
          />
          <CompareSubRow
            feature="Nettinopeus"
            suffix="Mbit/s"
            current={currentSub.speed}
            compareTo={offerSub.speed}
          />
          <CompareSubRow
            feature="Rajaton netti"
            current={<XorVIcon value={currentSub.unlimited} />}
            compareTo={<XorVIcon value={offerSub.unlimited} />}
            unlimitedDataCurrent={currentSub.unlimited}
            unlimitedDataOffer={offerSub.unlimited}
          />
          <CompareSubRow
            feature="Eu data"
            suffix="Gt/kk"
            current={currentSub.eu}
            compareTo={offerSub.eu}
          />
          <CompareSubRow
            feature="Norm. hinta"
            suffix="€/kk"
            current={currentSub.price}
            compareTo={offerSub.price}
          />
          <CompareSubRow
            feature="Tarjoushinta"
            suffix="€/kk"
            current={
              currentSubOffer ? currentSubOffer : <XorVIcon value={false} />
            }
            compareTo={offerSub.offer}
          />
          <CompareSubRow
            feature="Tarjouksen pituus"
            suffix={`kk${offerSub.bindingOffer ? '*' : ''}`}
            compareTo={offerSub.offerLength}
          />
          {!offerSub.bindingOffer ? (
            <CompareSubRow
              feature="Ei määräaikaa"
              compareTo={<XorVIcon value={true} />}
            />
          ) : null}
          {parseInt(offerSub.oneTimeDiscount) ? (
            
            <CompareSubRow
              feature="Lahjakortti"
              suffix="€"
              compareTo={offerSub.oneTimeDiscount}
            />
          ) : (
           
            handleManualOffer && handleManualOffer()
            
          
          )}
        </div>
    </>
  )
}

export default CompareOfferTable
