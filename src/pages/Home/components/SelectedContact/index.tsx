import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteItem } from '../../../../services';
import ManageContacts from '../ManageContacts';
import { useCallback, useState } from 'react';
import { Row, Col, Button, Popconfirm } from 'antd';
import styles from './index.module.css';
import { TContact } from '../../../../interface.ts';

const SelectedContact = ({
  selectedContact,
  handleSelectContact,
  contacts,
}: {
  selectedContact: TContact | null;
  handleSelectContact: (value: TContact | null) => void;
  contacts: TContact[] | null;
}) => {
  const [createContactVisible, setCreateContactVisible] = useState(false);
  const queryClient = useQueryClient();

  const toggleCreateContact = useCallback((value: boolean) => {
    setCreateContactVisible(value);
  }, []);

  const deleteMutate = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      handleSelectContact(
        contacts?.filter((value) => value?.id !== selectedContact?.id)?.[0] ||
          null,
      );
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });

  const handleDelete = useCallback(() => {
    if (selectedContact?.id) {
      deleteMutate.mutate(selectedContact?.id);
    }
  }, [selectedContact]);

  return (
    <>
      <Row>
        <Col span={8}>
          <Row gutter={16} style={{ padding: '40px 60px' }}>
            <Col span={12}>
              <div>
                <img
                  src={selectedContact?.image}
                  alt="profile"
                  height="auto"
                  width="160px"
                />
              </div>
            </Col>
            <Col span={12}>
              <div>{selectedContact?.fullName}</div>
              <div className={styles.marginTop}>
                {selectedContact?.preferredName}
              </div>
              <div className={styles.marginTop}>
                {selectedContact?.description}
              </div>
              <div className={styles.buttonsWrapper}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => toggleCreateContact(true)}
                >
                  Edit
                </Button>
                <Popconfirm
                  title="Delete the contact"
                  description="Are you sure to delete this contact?"
                  onConfirm={handleDelete}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button variant="outlined" color="danger">
                    Delete
                  </Button>
                </Popconfirm>
              </div>
            </Col>
          </Row>
        </Col>
        <Col></Col>
      </Row>
      <ManageContacts
        handleSelectContact={handleSelectContact}
        contactToEdit={selectedContact}
        open={createContactVisible}
        toggleCreateContact={toggleCreateContact}
      />
    </>
  );
};

export default SelectedContact;
