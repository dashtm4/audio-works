import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAudioState } from '@store/selectors';
import { fetchAudioList, upstreamAudio, selectID } from '@store/slices/audio';
import serverPaths from '@constants/serverPaths';
import { addAlert } from '@store/slices/alert';
import { Table } from '@components/Table';
import { Button } from '@components/Button';
import { LoadingBar } from '@components/LoadingBar';

const TABLE_COLUMNS = [
  { label: 'ID', value: '_id' },
  { label: 'File Name', value: 'filename' },
];

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_URL = process.env.REACT_APP_API_URL;
const URL = `${BASE_URL}/${API_URL}`;

export function Dashboard() {
  const dispatch = useDispatch();
  const { audioList, selectedID, loading, status } = useSelector(getAudioState);

  function handleChange(event: any) {
    const uploadedFile = event.target.files[0];
    const formData = new FormData();

    formData.append('file', uploadedFile);
    formData.append('name', uploadedFile.name);

    dispatch(upstreamAudio(formData) as any);
  }

  useEffect(() => {
    dispatch(fetchAudioList() as any);
  }, []);

  useEffect(() => {
    dispatch(addAlert(status));
  }, [status]);

  const handleSelect = (index: number) => {
    const id = audioList[index]._id;
    dispatch(selectID(id));
  };

  return (
    <section className="my-[32px] mx-[32px] bg-white shadow-md p-[32px]">
      {loading && <LoadingBar />}
      {!loading && (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-[32px]">Audio List</h1>
            <div className="overflow-hidden relative w-[72px] cursor-pointer">
              <Button className="w-full">Upload</Button>
              <input
                className="cursor-pointer absolute block opacity-0 inset-0"
                type="file"
                onChange={handleChange}
              />
            </div>
          </div>

          <Table columns={TABLE_COLUMNS} data={audioList} onSelect={handleSelect} />

          <h1 className="text-[32px] mt-[32px] mb-[12px]">Audio Player</h1>
          {selectedID && (
            <audio
              className="w-full"
              controls
              src={`${URL}${serverPaths.AUDIO.DOWNSTREAM(selectedID)}`}
            />
          )}
          {!selectedID && <div className="text-blue-900">Please select the audio to play</div>}
        </>
      )}
    </section>
  );
}
