import { StudentData } from "@/common/Types";
import { ReportData } from "@/common/Types/DiaryTypes";
import { createReport } from "@/common/Utils/DiaryUtils";
import { Button, Cell, Checkbox, FixedLayout, List, Modal, Multiselect, Navigation, Placeholder, Section } from "@telegram-apps/telegram-ui";
import { MiniApp, initHapticFeedback, initMiniApp, initUtils, retrieveLaunchParams, useHapticFeedback, useMiniApp, useUtils } from "@tma.js/sdk-react";
import { FC, useMemo, useState } from "react";
import { useMutation } from "react-query";
import { Link, useLocation } from "react-router-dom";



export const ReportPage: FC = () => {

  const data: StudentData = useLocation().state

  const [checkboxData, setCheckboxData] = useState(new Array(4).fill(false))
  const [fileLink, setFileLink] = useState<string>()
  const { initDataRaw } = retrieveLaunchParams()
  const utils = initUtils()
  const haptic = initHapticFeedback()


  const checkedQuarters = useMemo(() => {
      var result: number[] = []
      checkboxData.map((val, i) => {if (val) result.push(i + 1)})
      return result
  }, [checkboxData])

  const createMutation = useMutation(
    (reportData: ReportData) => createReport(reportData, initDataRaw),
    // {onSuccess: (data) => {utils.openLink('http://localhost:5000/api/diary/report/download/' + data.file_id)}}
)


  return (
    <List>
      <Placeholder header="Экспорт данных" description='После завершения экспорта автоматически откроется ссылка на Excel таблицу с данными'/>
      {[...Array(4)].map((_, i) => <Cell
        key={i}
        Component="label"
        multiline
        before={<Checkbox onChange={(e) => {
                const d = checkboxData.map((val, index) => i === index ? e.target.checked : val)
                setCheckboxData(d)
            }} checked={checkboxData[i]}/>}>{`Четверть: ${i+1}`}</Cell>)}
      <FixedLayout style={{padding: 16}}>
          {/* {fileLink && <Button size="l" stretched onClick={() => openLink(fileLink)}>открыть</Button>}    */}
          {/* {fileLink && <a href={fileLink} target="_blank" rel="noopener noreferrer">cdskjf</a>} */}
          <Button 
              size="l" 
              onClick={() => {
                  if (data) createMutation.mutate({
                      type: data?.user.type,
                      id: data?.user.diary_id,
                      quarters: checkedQuarters
                  })
              }
          }
          disabled={createMutation.isLoading || checkedQuarters.length == 0}
          loading={createMutation.isLoading}
          stretched>Создать отчет</Button>
      </FixedLayout>
    </List>
  );
};
