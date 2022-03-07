
const Card = ({tranactions}: any) => {
  console.log('card tranactions', tranactions);
  return <div>Card</div>
} 
export default Card

interface Transaction {
  hash: string
  from: string
  to: string
  value: number
}