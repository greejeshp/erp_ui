import React, { useState, useEffect, useCallback } from 'react';
import {
  Modal, Form, Input, InputNumber, Select, Button,
  notification, Divider,
} from 'antd';
import {
  PlusOutlined, ArrowRightOutlined, CheckCircleOutlined,
} from '@ant-design/icons';
import { QUICK_CREATE_FIELDS } from '../data/quickCreateSchema';

const { TextArea } = Input;
const { Option } = Select;

/* ═══════════════════════════════════════════════════════════════
   QuickCreateModal.jsx
   A compact creation modal that shows only required/key fields.
   Mirrors Tigg's "New Contact" modal UX but uses our design system.
   ═══════════════════════════════════════════════════════════════ */

function FieldInput({ field, form }) {
  const commonProps = {
    placeholder: field.placeholder,
    size: 'middle',
    style: { width: '100%' },
    id: `qc-field-${field.key}`,
  };

  switch (field.type) {
    case 'number':
      return (
        <InputNumber
          {...commonProps}
          min={0}
          step={field.key === 'rate' || field.key === 'amount' || field.key === 'cost' ? 0.01 : 1}
          precision={2}
          formatter={(v) => v && `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(v) => v.replace(/,/g, '')}
        />
      );
    case 'select':
      return (
        <Select {...commonProps} showSearch optionFilterProp="children" allowClear>
          {(field.options || []).map((opt) => (
            <Option key={opt} value={opt}>{opt}</Option>
          ))}
        </Select>
      );
    case 'textarea':
      return <TextArea {...commonProps} rows={3} />;
    case 'email':
      return <Input {...commonProps} type="email" />;
    case 'phone':
      return <Input {...commonProps} type="tel" />;
    default:
      return <Input {...commonProps} />;
  }
}

export default function QuickCreateModal({
  open,
  href,
  onClose,
  onOpenFullForm,
  darkMode,
}) {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);

  const schema = href ? QUICK_CREATE_FIELDS[href] : null;

  /* Reset form when entity changes */
  useEffect(() => {
    if (open) {
      form.resetFields();
      setSaving(false);
    }
  }, [open, href, form]);

  /* Keyboard: Escape closes */
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const handleSave = useCallback(async () => {
    try {
      await form.validateFields();
      setSaving(true);
      /* Simulate async save */
      await new Promise((res) => setTimeout(res, 600));
      notification.success({
        message: `${schema?.title || 'Record'} created!`,
        description: 'The record has been saved successfully.',
        icon: <CheckCircleOutlined style={{ color: '#28694b' }} />,
        placement: 'topRight',
        duration: 3,
      });
      form.resetFields();
      setSaving(false);
      onClose();
    } catch {
      /* Ant Design form validation shows inline errors — no need for extra toast */
      setSaving(false);
    }
  }, [form, schema, onClose]);

  const handleAddMoreDetails = useCallback(() => {
    onClose();
    if (onOpenFullForm && href) onOpenFullForm(href);
  }, [onClose, onOpenFullForm, href]);

  if (!schema) return null;

  /* Build row groups of fields (pair 12-span fields, full 24-span alone) */
  const renderFields = () => {
    const fields = schema.fields;
    const rows = [];
    let i = 0;
    while (i < fields.length) {
      const f = fields[i];
      if (f.span === 24) {
        rows.push([f]);
        i++;
      } else {
        /* Try to pair two 12-span fields */
        const next = fields[i + 1];
        if (next && next.span === 12) {
          rows.push([f, next]);
          i += 2;
        } else {
          rows.push([f]);
          i++;
        }
      }
    }
    return rows.map((row, ri) => (
      <div
        key={ri}
        style={{
          display: 'grid',
          gridTemplateColumns: row.length === 2 ? '1fr 1fr' : '1fr',
          gap: '0 16px',
        }}
      >
        {row.map((field) => (
          <Form.Item
            key={field.key}
            name={field.key}
            label={
              <span style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--text-secondary)' }}>
                {field.label}
                {field.required && <span style={{ color: 'var(--error)', marginLeft: 2 }}>*</span>}
              </span>
            }
            rules={
              field.required
                ? [{ required: true, message: `${field.label} is required` }]
                : []
            }
            style={{ marginBottom: 14 }}
            colon={false}
          >
            <FieldInput field={field} form={form} />
          </Form.Item>
        ))}
      </div>
    ));
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={540}
      footer={null}
      destroyOnClose
      centered
      className={`erp-quick-create-modal${darkMode ? ' dark' : ''}`}
      title={null}
      styles={{
        content: {
          padding: 0,
          borderRadius: 14,
          overflow: 'hidden',
          background: darkMode ? '#1a1d27' : '#ffffff',
          border: darkMode ? '1px solid #2d3142' : '1px solid #e8eaed',
        },
        mask: { backdropFilter: 'blur(4px)', background: 'rgba(0,0,0,0.35)' },
      }}
    >
      {/* ── Modal Header ── */}
      <div className="qc-modal-header">
        <div className="qc-modal-header-left">
          <div className="qc-modal-icon">＋</div>
          <div>
            <div className="qc-modal-title">{schema.title}</div>
            {schema.subtitle && (
              <div className="qc-modal-subtitle">{schema.subtitle}</div>
            )}
          </div>
        </div>
        <button className="qc-modal-close" onClick={onClose} aria-label="Close">✕</button>
      </div>

      <Divider style={{ margin: 0, borderColor: 'var(--border-color)' }} />

      {/* ── Form Body ── */}
      <div className="qc-modal-body">
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={handleSave}
        >
          {renderFields()}
        </Form>
      </div>

      <Divider style={{ margin: 0, borderColor: 'var(--border-color)' }} />

      {/* ── Modal Footer ── */}
      <div className="qc-modal-footer">
        <button
          className="qc-add-details-btn"
          onClick={handleAddMoreDetails}
          type="button"
        >
          <PlusOutlined style={{ fontSize: 11 }} />
          Add More Details
        </button>

        <div style={{ display: 'flex', gap: 8 }}>
          <Button
            onClick={onClose}
            size="middle"
            style={{ borderRadius: 8 }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            size="middle"
            loading={saving}
            onClick={handleSave}
            icon={<CheckCircleOutlined />}
            style={{
              borderRadius: 8,
              background: 'var(--primary)',
              borderColor: 'var(--primary)',
              fontWeight: 600,
              minWidth: 80,
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
}
