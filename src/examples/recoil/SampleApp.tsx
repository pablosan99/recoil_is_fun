import {useRecoilValue, useSetRecoilState} from 'recoil'
import {Rectangle, selectedElementState} from './../../components/Rectangle/Rectangle'
import {EditProperties} from './../../EditProperties'
import {PageContainer} from './../../PageContainer'
import {elementsState, Toolbar} from './../../Toolbar'
import { unsplashApi } from '../../components/ImageDataProvider';

function SampleApp() {
    const elements = useRecoilValue(elementsState)
    const setSelectedElement = useSetRecoilState(selectedElementState);
    const api = useRecoilValue(unsplashApi);
    return (
        <PageContainer
            onClick={() => {
                setSelectedElement(null)
            }}
        >
            <Toolbar />
            <EditProperties />
            {elements.map((id) => (
                <Rectangle key={id} id={id} />
            ))}
        </PageContainer>
    )
}


export default SampleApp
