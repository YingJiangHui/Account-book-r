import styled from 'styled-components';
import React, {FC} from 'react';
import TagItemChart from './AccountsRateOfTag/TagItemChart';

const Wrapper = styled.section`
  
  background: #fff;
  padding: 22px;
  margin-top: 6px;
  >div{
    margin-top: 20px;
    margin-bottom: 20px;
  }
`
type Props = {
  tags:TagItem[]
}
const AccountsRateOfTag:FC<Props> = ({tags})=>{

  return (
    <Wrapper>
      {tags.map(tag=>
        <TagItemChart key={tag.id} tag={tag} rate='50%'/>
      )}
    </Wrapper>
  )
}
export default AccountsRateOfTag